#!/usr/bin/env python3
"""
scan_wiki.py — Scan ai-solutions.wiki content for AWS/Azure service mentions.

Clones (or pulls) the wiki repo, walks all markdown files, counts how often
each known service name appears. Writes priority_services.json which the
manifest generator uses to annotate icons as "wiki_mentioned: true".

This runs as part of the weekly GHA workflow — the wiki repo is already
cloned into a sibling directory by the workflow.

Usage:
    python scan_wiki.py --wiki-dir /path/to/ai-solutions.wiki --out priority_services.json
"""

from __future__ import annotations

import argparse
import json
import logging
import re
from collections import defaultdict
from pathlib import Path

logger = logging.getLogger(__name__)

# ── Known service name tables ─────────────────────────────────────────────────
# These map the normalised icon ID to possible text mentions in markdown.
# Add new services here as the library grows.

AWS_SERVICES: dict[str, list[str]] = {
    "bedrock":                  ["bedrock", "amazon bedrock"],
    "bedrock-agentcore":        ["agentcore", "bedrock agentcore"],
    "sagemaker":                ["sagemaker", "amazon sagemaker"],
    "q":                        ["amazon q", "amazon q developer", "amazon q business"],
    "rekognition":              ["rekognition", "amazon rekognition"],
    "transcribe":               ["transcribe", "amazon transcribe"],
    "polly":                    ["polly", "amazon polly"],
    "textract":                 ["textract", "amazon textract"],
    "kendra":                   ["kendra", "amazon kendra"],
    "comprehend":               ["comprehend", "amazon comprehend"],
    "translate":                ["translate", "amazon translate"],
    "opensearch":               ["opensearch", "amazon opensearch"],
    "lambda":                   ["lambda", "aws lambda"],
    "s3":                       ["amazon s3", " s3 ", "s3 bucket"],
    "ec2":                      ["amazon ec2", " ec2 "],
    "iam":                      ["aws iam", "iam role", "iam policy"],
    "cloudwatch":               ["cloudwatch", "amazon cloudwatch"],
    "eventbridge":              ["eventbridge", "amazon eventbridge"],
    "stepfunctions":            ["step functions", "aws step functions"],
    "apigateway":               ["api gateway", "amazon api gateway"],
    "kms":                      ["kms", "aws kms", "key management"],
    "cognito":                  ["cognito", "amazon cognito"],
    "secretsmanager":           ["secrets manager", "aws secrets manager"],
    "waf":                      ["aws waf", " waf "],
    "guardduty":                ["guardduty", "amazon guardduty"],
    "cloudtrail":               ["cloudtrail", "aws cloudtrail"],
    "dynamodb":                 ["dynamodb", "amazon dynamodb"],
    "aurora":                   ["aurora", "amazon aurora"],
    "vpc":                      [" vpc ", "virtual private cloud"],
    "eks":                      ["amazon eks", " eks ", "elastic kubernetes"],
    "ecs":                      ["amazon ecs", " ecs ", "elastic container service"],
    "fargate":                  ["aws fargate", "fargate"],
    "glue":                     ["aws glue", "glue etl"],
    "athena":                   ["amazon athena"],
    "redshift":                 ["amazon redshift"],
    "kinesis":                  ["amazon kinesis"],
    "sns":                      ["amazon sns", "simple notification"],
    "sqs":                      ["amazon sqs", "simple queue"],
    "batch":                    ["aws batch"],
    "mediaconvert":             ["mediaconvert", "aws mediaconvert"],
    "bedrock-knowledge-bases":  ["knowledge base", "knowledge bases", "bedrock knowledge"],
    "bedrock-agents":           ["bedrock agent", "bedrock agents", "multi-agent"],
    "cloudformation":           ["cloudformation", "aws cloudformation"],
    "codecommit":               ["codecommit"],
    "codebuild":                ["codebuild"],
    "codepipeline":             ["codepipeline"],
    "ecr":                      ["ecr", "elastic container registry"],
    "route53":                  ["route 53", "route53"],
    "cloudfront":               ["cloudfront", "aws cloudfront"],
    "direct-connect":           ["direct connect", "aws direct connect"],
    "outposts":                 ["aws outposts", "outposts"],
}

AZURE_SERVICES: dict[str, list[str]] = {
    "azure-openai":             ["azure openai", "azure open ai"],
    "ai-foundry":               ["ai foundry", "azure ai foundry"],
    "azure-ai-search":          ["azure ai search", "cognitive search", "azure search"],
    "azure-machine-learning":   ["azure machine learning", "azure ml", "azureml"],
    "cognitive-services":       ["cognitive services", "azure cognitive"],
    "speech-services":          ["azure speech", "speech services"],
    "vision-services":          ["computer vision", "azure vision"],
    "language-services":        ["azure language", "language services", "text analytics"],
    "document-intelligence":    ["document intelligence", "form recognizer"],
    "translator":               ["azure translator"],
    "azure-functions":          ["azure functions"],
    "app-service":              ["app service", "azure app service"],
    "aks":                      [" aks ", "azure kubernetes", "azure k8s"],
    "container-apps":           ["container apps", "azure container apps"],
    "blob-storage":             ["blob storage", "azure blob"],
    "cosmos-db":                ["cosmos db", "cosmosdb"],
    "azure-sql":                ["azure sql"],
    "key-vault":                ["key vault", "azure key vault"],
    "entra-id":                 ["entra id", "azure ad", "azure active directory", "microsoft entra"],
    "monitor":                  ["azure monitor"],
    "log-analytics":            ["log analytics"],
    "event-grid":               ["event grid", "azure event grid"],
    "logic-apps":               ["logic apps", "azure logic apps"],
    "api-management":           ["api management", "azure apim", "apim"],
    "front-door":               ["azure front door", "front door"],
    "defender-for-cloud":       ["defender for cloud", "azure defender", "microsoft defender"],
    "azure-policy":             ["azure policy"],
    "purview":                  ["microsoft purview", "azure purview"],
    "microsoft-365-copilot":    ["microsoft 365 copilot", "m365 copilot", "copilot for microsoft 365"],
    "azure-devops":             ["azure devops"],
    "azure-arc":                ["azure arc"],
    "azure-stack-hub":          ["azure stack hub"],
    "synapse-analytics":        ["synapse analytics", "azure synapse"],
    "databricks":               ["azure databricks", "databricks"],
    "hdinsight":                ["hdinsight", "azure hdinsight"],
    "stream-analytics":         ["stream analytics", "azure stream analytics"],
    "data-factory":             ["data factory", "azure data factory", "adf"],
}


# ── Scanner ───────────────────────────────────────────────────────────────────

def scan_markdown_files(wiki_dir: Path) -> dict[str, dict[str, int]]:
    """
    Walk all .md files in wiki_dir and count service mentions.
    Returns {icon_id: {file_count: N, mention_count: M}}.
    """
    all_services = {**AWS_SERVICES, **AZURE_SERVICES}
    counts: dict[str, dict[str, int]] = defaultdict(lambda: {"file_count": 0, "mention_count": 0})

    md_files = list(wiki_dir.rglob("*.md"))
    logger.info("Scanning %d markdown files in %s", len(md_files), wiki_dir)

    for md_path in md_files:
        try:
            text = md_path.read_text(encoding="utf-8", errors="ignore").lower()
        except Exception:
            continue

        for icon_id, terms in all_services.items():
            file_hit = False
            for term in terms:
                count = text.count(term.lower())
                if count:
                    counts[icon_id]["mention_count"] += count
                    if not file_hit:
                        counts[icon_id]["file_count"] += 1
                        file_hit = True

    return dict(counts)


def determine_platform(icon_id: str) -> str:
    if icon_id in AWS_SERVICES:
        return "aws"
    if icon_id in AZURE_SERVICES:
        return "azure"
    return "unknown"


def write_priority_services(counts: dict, out_path: Path) -> None:
    """Write priority_services.json sorted by mention_count descending."""
    entries = []
    for icon_id, stats in counts.items():
        entries.append({
            "id":            icon_id,
            "platform":      determine_platform(icon_id),
            "mention_count": stats["mention_count"],
            "file_count":    stats["file_count"],
            "wiki_mentioned": True,
        })

    entries.sort(key=lambda e: e["mention_count"], reverse=True)
    out_path.write_text(json.dumps(entries, indent=2))
    logger.info("Wrote %d priority entries to %s", len(entries), out_path)


# ── CLI ───────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Scan ai-solutions.wiki for service mentions")
    parser.add_argument("--wiki-dir", required=True, type=Path, help="Path to cloned wiki repo")
    parser.add_argument("--out", default="priority_services.json", type=Path, help="Output JSON path")
    args = parser.parse_args()

    if not args.wiki_dir.exists():
        raise SystemExit(f"Wiki directory not found: {args.wiki_dir}")

    counts = scan_markdown_files(args.wiki_dir)
    write_priority_services(counts, args.out)

    top10 = sorted(counts.items(), key=lambda x: x[1]["mention_count"], reverse=True)[:10]
    print("\nTop 10 most-mentioned services in ai-solutions.wiki:")
    for icon_id, stats in top10:
        print(f"  {icon_id:<35} {stats['mention_count']:>5} mentions in {stats['file_count']} files")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    main()
