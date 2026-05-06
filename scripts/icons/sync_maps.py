#!/usr/bin/env python3
"""
sync_maps.py — Generate cloud region map SVGs.

Creates world map SVGs showing AWS, Azure, and GCP region locations.
These are simplified maps suitable for architecture diagrams.

Run: python scripts/icons/sync_maps.py
"""

from __future__ import annotations

import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

REPO_ROOT = Path(__file__).resolve().parents[2]
MAPS_DIR = REPO_ROOT / "static/icons/maps"

# Cloud region data with approximate lat/lon coordinates
# Coordinates are simplified for SVG positioning (x: 0-1000, y: 0-500)
AWS_REGIONS = {
    "us-east-1": {"name": "N. Virginia", "x": 280, "y": 180},
    "us-east-2": {"name": "Ohio", "x": 260, "y": 175},
    "us-west-1": {"name": "N. California", "x": 140, "y": 185},
    "us-west-2": {"name": "Oregon", "x": 145, "y": 165},
    "ca-central-1": {"name": "Canada", "x": 250, "y": 150},
    "eu-west-1": {"name": "Ireland", "x": 460, "y": 155},
    "eu-west-2": {"name": "London", "x": 475, "y": 155},
    "eu-west-3": {"name": "Paris", "x": 485, "y": 165},
    "eu-central-1": {"name": "Frankfurt", "x": 505, "y": 155},
    "eu-central-2": {"name": "Zurich", "x": 500, "y": 165},
    "eu-north-1": {"name": "Stockholm", "x": 520, "y": 125},
    "eu-south-1": {"name": "Milan", "x": 505, "y": 175},
    "eu-south-2": {"name": "Spain", "x": 470, "y": 180},
    "ap-south-1": {"name": "Mumbai", "x": 640, "y": 230},
    "ap-south-2": {"name": "Hyderabad", "x": 650, "y": 240},
    "ap-northeast-1": {"name": "Tokyo", "x": 820, "y": 185},
    "ap-northeast-2": {"name": "Seoul", "x": 795, "y": 180},
    "ap-northeast-3": {"name": "Osaka", "x": 815, "y": 190},
    "ap-southeast-1": {"name": "Singapore", "x": 730, "y": 280},
    "ap-southeast-2": {"name": "Sydney", "x": 870, "y": 380},
    "ap-southeast-3": {"name": "Jakarta", "x": 735, "y": 305},
    "ap-southeast-4": {"name": "Melbourne", "x": 865, "y": 395},
    "ap-east-1": {"name": "Hong Kong", "x": 760, "y": 225},
    "sa-east-1": {"name": "São Paulo", "x": 330, "y": 350},
    "af-south-1": {"name": "Cape Town", "x": 530, "y": 380},
    "me-south-1": {"name": "Bahrain", "x": 580, "y": 225},
    "me-central-1": {"name": "UAE", "x": 595, "y": 225},
    "il-central-1": {"name": "Tel Aviv", "x": 555, "y": 195},
}

AZURE_REGIONS = {
    "eastus": {"name": "East US", "x": 280, "y": 180},
    "eastus2": {"name": "East US 2", "x": 275, "y": 185},
    "westus": {"name": "West US", "x": 140, "y": 185},
    "westus2": {"name": "West US 2", "x": 145, "y": 170},
    "westus3": {"name": "West US 3", "x": 160, "y": 195},
    "centralus": {"name": "Central US", "x": 230, "y": 180},
    "northcentralus": {"name": "North Central US", "x": 240, "y": 170},
    "southcentralus": {"name": "South Central US", "x": 220, "y": 200},
    "canadacentral": {"name": "Canada Central", "x": 250, "y": 150},
    "canadaeast": {"name": "Canada East", "x": 280, "y": 145},
    "northeurope": {"name": "North Europe", "x": 460, "y": 155},
    "westeurope": {"name": "West Europe", "x": 480, "y": 160},
    "uksouth": {"name": "UK South", "x": 475, "y": 155},
    "ukwest": {"name": "UK West", "x": 465, "y": 155},
    "francecentral": {"name": "France Central", "x": 485, "y": 165},
    "germanywestcentral": {"name": "Germany West Central", "x": 505, "y": 155},
    "switzerlandnorth": {"name": "Switzerland North", "x": 500, "y": 165},
    "norwayeast": {"name": "Norway East", "x": 510, "y": 125},
    "swedencentral": {"name": "Sweden Central", "x": 520, "y": 125},
    "italynorth": {"name": "Italy North", "x": 505, "y": 175},
    "spaincentral": {"name": "Spain Central", "x": 470, "y": 180},
    "polandcentral": {"name": "Poland Central", "x": 525, "y": 155},
    "eastasia": {"name": "East Asia", "x": 760, "y": 225},
    "southeastasia": {"name": "Southeast Asia", "x": 730, "y": 280},
    "japaneast": {"name": "Japan East", "x": 820, "y": 185},
    "japanwest": {"name": "Japan West", "x": 815, "y": 190},
    "koreacentral": {"name": "Korea Central", "x": 795, "y": 180},
    "koreasouth": {"name": "Korea South", "x": 800, "y": 190},
    "centralindia": {"name": "Central India", "x": 640, "y": 230},
    "southindia": {"name": "South India", "x": 645, "y": 255},
    "westindia": {"name": "West India", "x": 625, "y": 235},
    "australiaeast": {"name": "Australia East", "x": 870, "y": 380},
    "australiasoutheast": {"name": "Australia Southeast", "x": 865, "y": 395},
    "australiacentral": {"name": "Australia Central", "x": 850, "y": 375},
    "brazilsouth": {"name": "Brazil South", "x": 330, "y": 350},
    "southafricanorth": {"name": "South Africa North", "x": 540, "y": 365},
    "southafricawest": {"name": "South Africa West", "x": 530, "y": 380},
    "uaenorth": {"name": "UAE North", "x": 595, "y": 225},
    "uaecentral": {"name": "UAE Central", "x": 590, "y": 230},
    "qatarcentral": {"name": "Qatar Central", "x": 580, "y": 225},
    "israelcentral": {"name": "Israel Central", "x": 555, "y": 195},
}

GCP_REGIONS = {
    "us-east1": {"name": "South Carolina", "x": 270, "y": 190},
    "us-east4": {"name": "N. Virginia", "x": 280, "y": 180},
    "us-east5": {"name": "Columbus", "x": 260, "y": 175},
    "us-central1": {"name": "Iowa", "x": 230, "y": 175},
    "us-south1": {"name": "Dallas", "x": 220, "y": 200},
    "us-west1": {"name": "Oregon", "x": 145, "y": 165},
    "us-west2": {"name": "Los Angeles", "x": 150, "y": 195},
    "us-west3": {"name": "Salt Lake City", "x": 170, "y": 180},
    "us-west4": {"name": "Las Vegas", "x": 160, "y": 190},
    "northamerica-northeast1": {"name": "Montréal", "x": 270, "y": 150},
    "northamerica-northeast2": {"name": "Toronto", "x": 260, "y": 155},
    "southamerica-east1": {"name": "São Paulo", "x": 330, "y": 350},
    "southamerica-west1": {"name": "Santiago", "x": 290, "y": 380},
    "europe-west1": {"name": "Belgium", "x": 490, "y": 155},
    "europe-west2": {"name": "London", "x": 475, "y": 155},
    "europe-west3": {"name": "Frankfurt", "x": 505, "y": 155},
    "europe-west4": {"name": "Netherlands", "x": 490, "y": 150},
    "europe-west6": {"name": "Zurich", "x": 500, "y": 165},
    "europe-west8": {"name": "Milan", "x": 505, "y": 175},
    "europe-west9": {"name": "Paris", "x": 485, "y": 165},
    "europe-west10": {"name": "Berlin", "x": 510, "y": 150},
    "europe-west12": {"name": "Turin", "x": 500, "y": 175},
    "europe-north1": {"name": "Finland", "x": 540, "y": 120},
    "europe-central2": {"name": "Warsaw", "x": 525, "y": 155},
    "europe-southwest1": {"name": "Madrid", "x": 470, "y": 180},
    "asia-east1": {"name": "Taiwan", "x": 775, "y": 225},
    "asia-east2": {"name": "Hong Kong", "x": 760, "y": 225},
    "asia-northeast1": {"name": "Tokyo", "x": 820, "y": 185},
    "asia-northeast2": {"name": "Osaka", "x": 815, "y": 190},
    "asia-northeast3": {"name": "Seoul", "x": 795, "y": 180},
    "asia-south1": {"name": "Mumbai", "x": 640, "y": 230},
    "asia-south2": {"name": "Delhi", "x": 645, "y": 215},
    "asia-southeast1": {"name": "Singapore", "x": 730, "y": 280},
    "asia-southeast2": {"name": "Jakarta", "x": 735, "y": 305},
    "australia-southeast1": {"name": "Sydney", "x": 870, "y": 380},
    "australia-southeast2": {"name": "Melbourne", "x": 865, "y": 395},
    "me-west1": {"name": "Tel Aviv", "x": 555, "y": 195},
    "me-central1": {"name": "Doha", "x": 580, "y": 225},
    "me-central2": {"name": "Dammam", "x": 575, "y": 225},
    "africa-south1": {"name": "Johannesburg", "x": 545, "y": 365},
}

# Simple world map outline (simplified continents)
WORLD_MAP_PATH = """
<!-- Simplified world map outline -->
<path d="M50,200 Q100,180 150,190 L200,180 Q250,170 300,175 L350,180 Q400,185 450,175 
         L500,170 Q550,165 600,175 L650,180 Q700,185 750,180 L800,175 Q850,170 900,180 
         L950,190" fill="none" stroke="#e5e7eb" stroke-width="1"/>

<!-- North America -->
<path d="M100,120 Q150,100 200,110 L280,130 Q320,140 350,160 L320,200 Q280,220 240,210 
         L180,190 Q140,180 120,160 Z" fill="#f3f4f6" stroke="#d1d5db" stroke-width="0.5"/>

<!-- South America -->
<path d="M280,280 Q300,260 320,270 L340,320 Q350,360 330,400 L300,420 Q270,400 280,350 Z" 
      fill="#f3f4f6" stroke="#d1d5db" stroke-width="0.5"/>

<!-- Europe -->
<path d="M450,120 Q480,110 520,115 L560,130 Q580,140 570,160 L540,175 Q500,180 470,170 
         L450,150 Z" fill="#f3f4f6" stroke="#d1d5db" stroke-width="0.5"/>

<!-- Africa -->
<path d="M480,200 Q520,190 560,200 L580,250 Q590,300 570,350 L540,400 Q500,410 480,380 
         L470,320 Q460,260 480,200 Z" fill="#f3f4f6" stroke="#d1d5db" stroke-width="0.5"/>

<!-- Asia -->
<path d="M580,100 Q650,90 720,100 L800,120 Q850,140 880,180 L860,220 Q820,250 760,240 
         L700,220 Q640,200 600,170 L580,140 Z" fill="#f3f4f6" stroke="#d1d5db" stroke-width="0.5"/>

<!-- Australia -->
<path d="M820,340 Q860,330 900,350 L910,390 Q900,420 860,420 L830,400 Q810,370 820,340 Z" 
      fill="#f3f4f6" stroke="#d1d5db" stroke-width="0.5"/>
"""


def generate_region_map(provider: str, regions: dict, color: str) -> str:
    """Generate an SVG map with region markers."""
    
    # Generate region markers
    markers = []
    for region_id, data in regions.items():
        x, y = data["x"], data["y"]
        name = data["name"]
        markers.append(f'''
    <g class="region" data-region="{region_id}">
      <circle cx="{x}" cy="{y}" r="4" fill="{color}" opacity="0.8"/>
      <circle cx="{x}" cy="{y}" r="6" fill="none" stroke="{color}" stroke-width="1" opacity="0.4"/>
    </g>''')
    
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="1000" height="500">
  <title>{provider.upper()} Cloud Regions Map</title>
  <desc>World map showing {provider.upper()} cloud region locations</desc>
  
  <!-- Background -->
  <rect width="1000" height="500" fill="#fafafa"/>
  
  {WORLD_MAP_PATH}
  
  <!-- Region markers -->
  <g id="regions">
    {"".join(markers)}
  </g>
  
  <!-- Legend -->
  <g transform="translate(20, 460)">
    <circle cx="0" cy="0" r="4" fill="{color}"/>
    <text x="12" y="4" font-family="system-ui, sans-serif" font-size="12" fill="#374151">{provider.upper()} Region</text>
  </g>
</svg>'''
    
    return svg


def generate_combined_map() -> str:
    """Generate a combined map showing all cloud providers."""
    
    colors = {
        "aws": "#FF9900",
        "azure": "#0078D4", 
        "gcp": "#4285F4"
    }
    
    all_regions = {
        "aws": AWS_REGIONS,
        "azure": AZURE_REGIONS,
        "gcp": GCP_REGIONS
    }
    
    markers = []
    for provider, regions in all_regions.items():
        color = colors[provider]
        for region_id, data in regions.items():
            x, y = data["x"], data["y"]
            # Offset slightly to avoid overlap
            if provider == "azure":
                x += 3
                y += 3
            elif provider == "gcp":
                x -= 3
                y -= 3
            markers.append(f'''
    <circle cx="{x}" cy="{y}" r="3" fill="{color}" opacity="0.7" data-provider="{provider}" data-region="{region_id}"/>''')
    
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="1000" height="500">
  <title>Multi-Cloud Regions Map</title>
  <desc>World map showing AWS, Azure, and GCP cloud region locations</desc>
  
  <!-- Background -->
  <rect width="1000" height="500" fill="#fafafa"/>
  
  {WORLD_MAP_PATH}
  
  <!-- Region markers -->
  <g id="regions">
    {"".join(markers)}
  </g>
  
  <!-- Legend -->
  <g transform="translate(20, 430)">
    <circle cx="0" cy="0" r="4" fill="#FF9900"/>
    <text x="12" y="4" font-family="system-ui, sans-serif" font-size="11" fill="#374151">AWS</text>
    
    <circle cx="60" cy="0" r="4" fill="#0078D4"/>
    <text x="72" y="4" font-family="system-ui, sans-serif" font-size="11" fill="#374151">Azure</text>
    
    <circle cx="130" cy="0" r="4" fill="#4285F4"/>
    <text x="142" y="4" font-family="system-ui, sans-serif" font-size="11" fill="#374151">GCP</text>
  </g>
</svg>'''
    
    return svg


def create_metadata() -> dict:
    """Create metadata for cloud region maps."""
    return {
        "source": "Custom generated",
        "license": "CC-BY-NC-SA 4.0",
        "attribution": "freelancer-templates.org",
        "note": "Simplified world maps showing cloud provider region locations. Region coordinates are approximate.",
        "maps": {
            "aws-regions": {
                "name": "AWS Regions Map",
                "description": "World map showing AWS region locations",
                "region_count": len(AWS_REGIONS)
            },
            "azure-regions": {
                "name": "Azure Regions Map", 
                "description": "World map showing Azure region locations",
                "region_count": len(AZURE_REGIONS)
            },
            "gcp-regions": {
                "name": "GCP Regions Map",
                "description": "World map showing GCP region locations",
                "region_count": len(GCP_REGIONS)
            },
            "multi-cloud-regions": {
                "name": "Multi-Cloud Regions Map",
                "description": "Combined map showing AWS, Azure, and GCP regions",
                "region_count": len(AWS_REGIONS) + len(AZURE_REGIONS) + len(GCP_REGIONS)
            }
        },
        "regions": {
            "aws": {k: v["name"] for k, v in AWS_REGIONS.items()},
            "azure": {k: v["name"] for k, v in AZURE_REGIONS.items()},
            "gcp": {k: v["name"] for k, v in GCP_REGIONS.items()}
        }
    }


def sync_maps():
    """Generate cloud region map SVGs."""
    logger.info("Generating cloud region maps...")
    
    MAPS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Generate individual provider maps
    maps_generated = []
    
    # AWS map
    aws_svg = generate_region_map("aws", AWS_REGIONS, "#FF9900")
    (MAPS_DIR / "aws-regions.svg").write_text(aws_svg)
    maps_generated.append("aws-regions.svg")
    logger.info("Generated AWS regions map with %d regions", len(AWS_REGIONS))
    
    # Azure map
    azure_svg = generate_region_map("azure", AZURE_REGIONS, "#0078D4")
    (MAPS_DIR / "azure-regions.svg").write_text(azure_svg)
    maps_generated.append("azure-regions.svg")
    logger.info("Generated Azure regions map with %d regions", len(AZURE_REGIONS))
    
    # GCP map
    gcp_svg = generate_region_map("gcp", GCP_REGIONS, "#4285F4")
    (MAPS_DIR / "gcp-regions.svg").write_text(gcp_svg)
    maps_generated.append("gcp-regions.svg")
    logger.info("Generated GCP regions map with %d regions", len(GCP_REGIONS))
    
    # Combined multi-cloud map
    combined_svg = generate_combined_map()
    (MAPS_DIR / "multi-cloud-regions.svg").write_text(combined_svg)
    maps_generated.append("multi-cloud-regions.svg")
    logger.info("Generated multi-cloud regions map")
    
    # Write metadata
    metadata = create_metadata()
    (MAPS_DIR / "metadata.json").write_text(json.dumps(metadata, indent=2))
    logger.info("Wrote maps metadata")
    
    # Create README
    readme = """# Cloud Region Maps

Simplified world maps showing cloud provider region locations.

## Available Maps

- **aws-regions.svg** - AWS region locations
- **azure-regions.svg** - Azure region locations  
- **gcp-regions.svg** - GCP region locations
- **multi-cloud-regions.svg** - Combined view of all providers

## Usage

These maps are designed for use in architecture diagrams and presentations
to show geographic distribution of cloud resources.

## Data Sources

Region location data is compiled from official cloud provider documentation:
- AWS: https://aws.amazon.com/about-aws/global-infrastructure/
- Azure: https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/
- GCP: https://cloud.google.com/about/locations

## License

CC-BY-NC-SA 4.0 - Created by freelancer-templates.org
"""
    (MAPS_DIR / "README.md").write_text(readme)
    
    logger.info("Generated %d cloud region maps", len(maps_generated))


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    sync_maps()
