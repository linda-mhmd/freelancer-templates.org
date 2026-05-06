#!/usr/bin/env python3
"""
sync_community.py — Download and normalise community/third-party icons.

Sources:
  - Simple Icons (https://simpleicons.org) — DevOps, databases, cloud providers, etc.
  - Custom curated list for architecture diagrams

Output:     static/icons/platforms/community/devops/
            static/icons/platforms/community/databases/
            static/icons/platforms/community/cloud/
            static/icons/platforms/community/infrastructure/
            static/icons/platforms/community/ai-ml/
            static/icons/platforms/community/web/

Returns:    dict with added/removed/changed icon lists
"""

from __future__ import annotations

import hashlib
import io
import json
import logging
import os
import re
import shutil
import tempfile
import zipfile
from pathlib import Path
from typing import Optional
from datetime import date

import requests

logger = logging.getLogger(__name__)

REPO_ROOT   = Path(__file__).resolve().parents[2]
OUT_DIR     = REPO_ROOT / "static/icons/platforms/community"
STATE_FILE  = REPO_ROOT / "scripts/icons/.sync-state.json"

# Simple Icons CDN base URL
SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org"
SIMPLE_ICONS_JSON = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/slugs.md"
SIMPLE_ICONS_DATA = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json"

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; icon-sync-bot/1.0)"}

# Curated list of icons we want, organized by category
# Format: {category: [(slug, display_name), ...]}
# Source: Simple Icons (https://simpleicons.org) — CC0 1.0 Universal (Public Domain)
# Note: Icons are trademarks of their respective owners. Usage must comply with each brand's guidelines.
CURATED_ICONS = {
    "devops": [
        ("github", "GitHub"),
        ("gitlab", "GitLab"),
        ("jenkins", "Jenkins"),
        ("circleci", "CircleCI"),
        ("travisci", "Travis CI"),
        ("githubactions", "GitHub Actions"),
        ("bitbucket", "Bitbucket"),
        ("teamcity", "TeamCity"),
        ("bamboo", "Bamboo"),
        ("drone", "Drone CI"),
        ("flux", "Flux"),
        ("spinnaker", "Spinnaker"),
        ("octopusdeploy", "Octopus Deploy"),
        ("codecov", "Codecov"),
        ("snyk", "Snyk"),
        ("dependabot", "Dependabot"),
        ("jfrog", "JFrog"),
        ("sonar", "SonarQube"),
        ("argo", "Argo CD"),
        ("codefresh", "Codefresh"),
        ("buildkite", "Buildkite"),
        ("semaphoreci", "Semaphore CI"),
        ("renovate", "Renovate"),
        ("githubcopilot", "GitHub Copilot"),
    ],
    "containers": [
        ("kubernetes", "Kubernetes"),
        ("docker", "Docker"),
        ("helm", "Helm"),
        ("rancher", "Rancher"),
        ("podman", "Podman"),
        ("containerd", "containerd"),
        ("istio", "Istio"),
        ("envoyproxy", "Envoy Proxy"),
        ("linkerd", "Linkerd"),
        ("consul", "Consul"),
        ("nomad", "Nomad"),
        ("portainer", "Portainer"),
        ("k3s", "K3s"),
        ("redhatopenshift", "OpenShift"),
        ("amazoneks", "Amazon EKS"),
        ("amazonecs", "Amazon ECS"),
        ("googlekubernetesengine", "Google Kubernetes Engine"),
        ("azurekubernetesservice", "Azure Kubernetes Service"),
        ("crio", "CRI-O"),
        ("lxc", "LXC"),
        ("openfaas", "OpenFaaS"),
        ("knative", "Knative"),
        ("dapr", "Dapr"),
    ],
    "cloud": [
        ("googlecloud", "Google Cloud"),
        ("digitalocean", "DigitalOcean"),
        ("vultr", "Vultr"),
        ("hetzner", "Hetzner"),
        ("ovh", "OVH"),
        ("scaleway", "Scaleway"),
        ("cloudflare", "Cloudflare"),
        ("fastly", "Fastly"),
        ("akamai", "Akamai"),
        ("vercel", "Vercel"),
        ("netlify", "Netlify"),
        ("render", "Render"),
        ("railway", "Railway"),
        ("alibabacloud", "Alibaba Cloud"),
        ("upcloud", "UpCloud"),
        ("backblaze", "Backblaze"),
        ("wasabi", "Wasabi"),
        ("cloudways", "Cloudways"),
        ("platformdotsh", "Platform.sh"),
        ("northflank", "Northflank"),
        ("koyeb", "Koyeb"),
        ("cyclic", "Cyclic"),
        ("deta", "Deta"),
    ],
    "gcp": [
        # Google Cloud Platform services (via Simple Icons)
        ("googlecloud", "Google Cloud"),
        ("googlebigquery", "BigQuery"),
        ("googlecloudstorage", "Cloud Storage"),
        ("googlekubernetes", "Google Kubernetes Engine"),
        ("googleappsscript", "Apps Script"),
        ("googleanalytics", "Google Analytics"),
        ("googlemaps", "Google Maps Platform"),
        ("googleassistant", "Google Assistant"),
        ("googlechrome", "Chrome"),
        ("googlefonts", "Google Fonts"),
        ("googlesheets", "Google Sheets"),
        ("googledocs", "Google Docs"),
        ("googledrive", "Google Drive"),
        ("googlecalendar", "Google Calendar"),
        ("googlemeet", "Google Meet"),
        ("googleclassroom", "Google Classroom"),
        ("googleads", "Google Ads"),
        ("googletagmanager", "Google Tag Manager"),
        ("googlesearchconsole", "Search Console"),
        ("googleoptimize", "Google Optimize"),
        ("googlepay", "Google Pay"),
        ("googleplay", "Google Play"),
        ("googlehome", "Google Home"),
        ("googlelens", "Google Lens"),
        ("googletranslate", "Google Translate"),
        ("googleearth", "Google Earth"),
        ("googlephotos", "Google Photos"),
        ("googlefit", "Google Fit"),
        ("googlekeep", "Google Keep"),
        ("googlepodcasts", "Google Podcasts"),
        ("dialogflow", "Dialogflow"),
        ("looker", "Looker"),
        ("apigee", "Apigee"),
    ],
    "databases": [
        # Relational Databases (verified working slugs)
        ("postgresql", "PostgreSQL"),
        ("mysql", "MySQL"),
        ("mariadb", "MariaDB"),
        ("sqlite", "SQLite"),
        # NoSQL Databases
        ("mongodb", "MongoDB"),
        ("redis", "Redis"),
        ("elasticsearch", "Elasticsearch"),
        ("opensearch", "OpenSearch"),
        ("apachecassandra", "Apache Cassandra"),
        ("couchbase", "Couchbase"),
        ("neo4j", "Neo4j"),
        ("arangodb", "ArangoDB"),
        ("fauna", "Fauna"),
        # Time Series & Analytics
        ("influxdb", "InfluxDB"),
        ("timescale", "TimescaleDB"),
        ("clickhouse", "ClickHouse"),
        ("victoriametrics", "VictoriaMetrics"),
        # Cloud-Native Databases
        ("cockroachlabs", "CockroachDB"),
        ("planetscale", "PlanetScale"),
        ("supabase", "Supabase"),
        ("firebase", "Firebase"),
        ("neon", "Neon"),
        ("turso", "Turso"),
        ("vitess", "Vitess"),
        ("singlestore", "SingleStore"),
        ("duckdb", "DuckDB"),
        # Data Warehouses
        ("snowflake", "Snowflake"),
        ("databricks", "Databricks"),
        # Data Streaming & Messaging
        ("apachekafka", "Apache Kafka"),
        ("apachepulsar", "Apache Pulsar"),
        ("rabbitmq", "RabbitMQ"),
        # Big Data Processing
        ("apachespark", "Apache Spark"),
        ("apacheflink", "Apache Flink"),
        ("apacheairflow", "Apache Airflow"),
        ("apachehadoop", "Apache Hadoop"),
        ("apachehive", "Apache Hive"),
        ("apachenifi", "Apache NiFi"),
        ("presto", "Presto"),
        ("trino", "Trino"),
        ("apachedruid", "Apache Druid"),
        ("apachestorm", "Apache Storm"),
        # Graph Databases
        ("dgraph", "Dgraph"),
    ],
    "infrastructure": [
        ("terraform", "Terraform"),
        ("ansible", "Ansible"),
        ("puppet", "Puppet"),
        ("chef", "Chef"),
        ("saltproject", "Salt"),
        ("pulumi", "Pulumi"),
        ("vagrant", "Vagrant"),
        ("packer", "Packer"),
        ("vault", "HashiCorp Vault"),
        ("vmware", "VMware"),
        ("proxmox", "Proxmox"),
        ("openstack", "OpenStack"),
        ("nutanix", "Nutanix"),
        ("netapp", "NetApp"),
        ("cisco", "Cisco"),
        ("paloaltonetworks", "Palo Alto Networks"),
        ("fortinet", "Fortinet"),
        ("nginx", "NGINX"),
        ("apache", "Apache HTTP Server"),
        ("caddy", "Caddy"),
        ("kong", "Kong"),
        ("apachetomcat", "Apache Tomcat"),
        ("traefik", "Traefik"),
        ("haproxy", "HAProxy"),
        ("cloudflare", "Cloudflare"),
        ("ubiquiti", "Ubiquiti"),
        ("mikrotik", "MikroTik"),
        ("juniper", "Juniper Networks"),
        ("arista", "Arista Networks"),
        ("f5", "F5"),
        ("citrix", "Citrix"),
        ("zscaler", "Zscaler"),
        ("wireguard", "WireGuard"),
        ("openvpn", "OpenVPN"),
        ("tailscale", "Tailscale"),
        ("zerotier", "ZeroTier"),
        ("cloudformation", "CloudFormation"),
        ("crossplane", "Crossplane"),
    ],
    "ai-ml": [
        # AI/ML Frameworks & Tools
        ("huggingface", "Hugging Face"),
        ("pytorch", "PyTorch"),
        ("tensorflow", "TensorFlow"),
        ("keras", "Keras"),
        ("scikitlearn", "scikit-learn"),
        ("jupyter", "Jupyter"),
        ("anaconda", "Anaconda"),
        ("mlflow", "MLflow"),
        ("ray", "Ray"),
        ("dvc", "DVC"),
        ("weightsandbiases", "Weights & Biases"),
        ("langchain", "LangChain"),
        ("ollama", "Ollama"),
        ("nvidia", "NVIDIA"),
        ("amd", "AMD"),
        ("intel", "Intel"),
        ("googlecolab", "Google Colab"),
        ("kaggle", "Kaggle"),
        ("streamlit", "Streamlit"),
        ("gradio", "Gradio"),
        # LLM Providers & AI Companies
        ("anthropic", "Anthropic"),
        ("replicate", "Replicate"),
        ("perplexity", "Perplexity"),
        ("modal", "Modal"),
        ("bentoml", "BentoML"),
        ("neptune", "Neptune.ai"),
        ("roboflow", "Roboflow"),
        ("ultralytics", "Ultralytics"),
        ("onnx", "ONNX"),
        ("deepseek", "DeepSeek"),
        # AI Tools
        ("notion", "Notion AI"),
        ("grammarly", "Grammarly"),
        ("deepl", "DeepL"),
        ("elevenlabs", "ElevenLabs"),
        ("suno", "Suno"),
    ],
    "web": [
        # JavaScript/TypeScript Ecosystem
        ("react", "React"),
        ("vuedotjs", "Vue.js"),
        ("angular", "Angular"),
        ("svelte", "Svelte"),
        ("nextdotjs", "Next.js"),
        ("astro", "Astro"),
        ("remix", "Remix"),
        ("gatsby", "Gatsby"),
        ("hugo", "Hugo"),
        ("nodedotjs", "Node.js"),
        ("deno", "Deno"),
        ("bun", "Bun"),
        # Programming Languages
        ("python", "Python"),
        ("go", "Go"),
        ("rust", "Rust"),
        ("dotnet", ".NET"),
        ("php", "PHP"),
        ("ruby", "Ruby"),
        ("typescript", "TypeScript"),
        ("javascript", "JavaScript"),
        ("java", "Java"),
        ("kotlin", "Kotlin"),
        ("scala", "Scala"),
        ("elixir", "Elixir"),
        ("erlang", "Erlang"),
        ("haskell", "Haskell"),
        ("clojure", "Clojure"),
        ("cplusplus", "C++"),
        ("c", "C"),
        ("csharp", "C#"),
        ("swift", "Swift"),
        ("dart", "Dart"),
        ("zig", "Zig"),
        ("nim", "Nim"),
        ("crystal", "Crystal"),
        ("julia", "Julia"),
        ("r", "R"),
        ("lua", "Lua"),
        ("perl", "Perl"),
        ("groovy", "Groovy"),
        # Additional Languages & Markup
        ("html5", "HTML5"),
        ("json", "JSON"),
        ("yaml", "YAML"),
        ("xml", "XML"),
        ("markdown", "Markdown"),
        ("webassembly", "WebAssembly"),
        ("solidity", "Solidity"),
        ("ocaml", "OCaml"),
        ("fsharp", "F#"),
        ("fortran", "Fortran"),
        ("gnubash", "Bash"),
        ("zsh", "Zsh"),
        # Scripting & Config
        ("toml", "TOML"),
        ("dotenv", "dotenv"),
        ("editorconfig", "EditorConfig"),
        ("prettier", "Prettier"),
        ("eslint", "ESLint"),
        ("biome", "Biome"),
        ("ruff", "Ruff"),
        ("black", "Black"),
    ],
    "vendors": [
        # Major Cloud & Tech Vendors
        ("googlecloud", "Google Cloud"),
        ("redhat", "Red Hat"),
        ("apple", "Apple"),
        ("google", "Google"),
        ("meta", "Meta"),
        ("sap", "SAP"),
        ("vmware", "VMware"),
        ("cisco", "Cisco"),
        ("dell", "Dell"),
        ("hp", "HP"),
        ("lenovo", "Lenovo"),
        ("intel", "Intel"),
        ("amd", "AMD"),
        ("nvidia", "NVIDIA"),
        ("arm", "ARM"),
        ("qualcomm", "Qualcomm"),
        ("broadcom", "Broadcom"),
        # Enterprise Software
        ("atlassian", "Atlassian"),
        ("hashicorp", "HashiCorp"),
        ("elastic", "Elastic"),
        ("mongodb", "MongoDB Inc"),
        ("snowflake", "Snowflake"),
        ("databricks", "Databricks"),
        ("datadog", "Datadog"),
        ("splunk", "Splunk"),
        ("pagerduty", "PagerDuty"),
        ("newrelic", "New Relic"),
        ("dynatrace", "Dynatrace"),
        # Open Source Foundations
        ("linuxfoundation", "Linux Foundation"),
        ("apache", "Apache Software Foundation"),
        ("cncf", "CNCF"),
        ("python", "Python Software Foundation"),
        ("rust", "Rust Foundation"),
        ("gnome", "GNOME"),
        ("kde", "KDE"),
        # Operating Systems
        ("linux", "Linux"),
        ("ubuntu", "Ubuntu"),
        ("debian", "Debian"),
        ("fedora", "Fedora"),
        ("centos", "CentOS"),
        ("rockylinux", "Rocky Linux"),
        ("almalinux", "AlmaLinux"),
        ("archlinux", "Arch Linux"),
        ("opensuse", "openSUSE"),
        ("alpinelinux", "Alpine Linux"),
        ("nixos", "NixOS"),
        ("gentoo", "Gentoo"),
        ("kalilinux", "Kali Linux"),
        ("macos", "macOS"),
        ("ios", "iOS"),
        ("android", "Android"),
        ("freebsd", "FreeBSD"),
        ("openbsd", "OpenBSD"),
    ],
    "frameworks": [
        # Backend Frameworks
        ("django", "Django"),
        ("flask", "Flask"),
        ("fastapi", "FastAPI"),
        ("springboot", "Spring Boot"),
        ("spring", "Spring"),
        ("express", "Express.js"),
        ("nestjs", "NestJS"),
        ("rubyonrails", "Ruby on Rails"),
        ("laravel", "Laravel"),
        ("symfony", "Symfony"),
        ("gin", "Gin"),
        ("fiber", "Fiber"),
        ("echo", "Echo"),
        ("actix", "Actix"),
        ("rocket", "Rocket"),
        ("axum", "Axum"),
        ("phoenix", "Phoenix"),
        ("adonisjs", "AdonisJS"),
        ("hono", "Hono"),
        ("elysia", "Elysia"),
        ("koa", "Koa"),
        ("hapi", "Hapi"),
        ("strapi", "Strapi"),
        ("directus", "Directus"),
        ("payload", "Payload CMS"),
        ("keystonejs", "Keystone.js"),
        ("redwood", "RedwoodJS"),
        ("blitz", "Blitz.js"),
    ],
    "frontend": [
        # Frontend Frameworks & Tools
        ("tailwindcss", "Tailwind CSS"),
        ("bootstrap", "Bootstrap"),
        ("mui", "Material UI"),
        ("chakraui", "Chakra UI"),
        ("antdesign", "Ant Design"),
        ("shadcnui", "shadcn/ui"),
        ("radixui", "Radix UI"),
        ("headlessui", "Headless UI"),
        ("styledcomponents", "styled-components"),
        ("emotion", "Emotion"),
        ("sass", "Sass"),
        ("less", "Less"),
        ("postcss", "PostCSS"),
        ("vite", "Vite"),
        ("webpack", "Webpack"),
        ("rollup", "Rollup"),
        ("esbuild", "esbuild"),
        ("swc", "SWC"),
        ("parcel", "Parcel"),
        ("turbopack", "Turbopack"),
        ("storybook", "Storybook"),
        ("chromatic", "Chromatic"),
        ("framer", "Framer Motion"),
        ("gsap", "GSAP"),
        ("threejs", "Three.js"),
        ("d3dotjs", "D3.js"),
        ("chartdotjs", "Chart.js"),
        ("apexcharts", "ApexCharts"),
        ("recharts", "Recharts"),
        ("visx", "visx"),
        ("plotly", "Plotly"),
        ("leaflet", "Leaflet"),
        ("mapbox", "Mapbox"),
        ("cesium", "Cesium"),
        ("openlayers", "OpenLayers"),
    ],
    "mobile": [
        # Mobile Development
        ("flutter", "Flutter"),
        ("reactnative", "React Native"),
        ("swift", "Swift"),
        ("kotlin", "Kotlin"),
        ("xcode", "Xcode"),
        ("androidstudio", "Android Studio"),
        ("expo", "Expo"),
        ("ionic", "Ionic"),
        ("capacitor", "Capacitor"),
        ("nativescript", "NativeScript"),
        ("tauri", "Tauri"),
        ("electron", "Electron"),
        ("pwa", "PWA"),
        ("cordova", "Apache Cordova"),
        ("xamarin", "Xamarin"),
        ("maui", "MAUI"),
        ("jetpackcompose", "Jetpack Compose"),
        ("swiftui", "SwiftUI"),
    ],
    "testing": [
        # Testing Tools
        ("jest", "Jest"),
        ("vitest", "Vitest"),
        ("cypress", "Cypress"),
        ("playwright", "Playwright"),
        ("selenium", "Selenium"),
        ("puppeteer", "Puppeteer"),
        ("testinglibrary", "Testing Library"),
        ("mocha", "Mocha"),
        ("chai", "Chai"),
        ("jasmine", "Jasmine"),
        ("pytest", "pytest"),
        ("junit", "JUnit"),
        ("testng", "TestNG"),
        ("rspec", "RSpec"),
        ("phpunit", "PHPUnit"),
        ("postman", "Postman"),
        ("insomnia", "Insomnia"),
        ("hoppscotch", "Hoppscotch"),
        ("k6", "k6"),
        ("gatling", "Gatling"),
        ("locust", "Locust"),
        ("artillery", "Artillery"),
        ("jmeter", "JMeter"),
        ("loadrunner", "LoadRunner"),
        ("browserstack", "BrowserStack"),
        ("saucelabs", "Sauce Labs"),
        ("lambdatest", "LambdaTest"),
        ("appium", "Appium"),
        ("detox", "Detox"),
        ("maestro", "Maestro"),
    ],
    "api": [
        # API & GraphQL
        ("graphql", "GraphQL"),
        ("apollographql", "Apollo GraphQL"),
        ("hasura", "Hasura"),
        ("swagger", "Swagger"),
        ("openapi", "OpenAPI"),
        ("trpc", "tRPC"),
        ("grpc", "gRPC"),
        ("protobuf", "Protocol Buffers"),
        ("asyncapi", "AsyncAPI"),
        ("json", "JSON"),
        ("yaml", "YAML"),
        ("xml", "XML"),
        ("soap", "SOAP"),
        ("rest", "REST"),
        ("webhooks", "Webhooks"),
        ("websocket", "WebSocket"),
        ("socketdotio", "Socket.io"),
        ("mqtt", "MQTT"),
        ("amqp", "AMQP"),
        ("rabbitmq", "RabbitMQ"),
        ("zeromq", "ZeroMQ"),
        ("nats", "NATS"),
    ],
    "monitoring": [
        ("prometheus", "Prometheus"),
        ("grafana", "Grafana"),
        ("datadog", "Datadog"),
        ("newrelic", "New Relic"),
        ("splunk", "Splunk"),
        ("elastic", "Elastic"),
        ("kibana", "Kibana"),
        ("logstash", "Logstash"),
        ("fluentd", "Fluentd"),
        ("jaeger", "Jaeger"),
        ("sentry", "Sentry"),
        ("pagerduty", "PagerDuty"),
        ("opsgenie", "Opsgenie"),
        ("statuspage", "Statuspage"),
        ("icinga", "Icinga"),
        ("zabbix", "Zabbix"),
        ("nagios", "Nagios"),
        ("dynatrace", "Dynatrace"),
        ("appdynamics", "AppDynamics"),
        ("honeycomb", "Honeycomb"),
        ("lightstep", "Lightstep"),
        ("signoz", "SigNoz"),
        ("uptimerobot", "UptimeRobot"),
        ("betterstack", "Better Stack"),
        ("cronitor", "Cronitor"),
        ("checkly", "Checkly"),
        ("opentelemetry", "OpenTelemetry"),
        ("zipkin", "Zipkin"),
        ("tempo", "Grafana Tempo"),
        ("loki", "Grafana Loki"),
        ("mimir", "Grafana Mimir"),
        ("thanos", "Thanos"),
        ("cortex", "Cortex"),
        ("victoriametrics", "VictoriaMetrics"),
    ],
    "security": [
        ("1password", "1Password"),
        ("lastpass", "LastPass"),
        ("bitwarden", "Bitwarden"),
        ("okta", "Okta"),
        ("auth0", "Auth0"),
        ("keycloak", "Keycloak"),
        ("letsencrypt", "Let's Encrypt"),
        ("trivy", "Trivy"),
        ("falco", "Falco"),
        ("aquasecurity", "Aqua Security"),
        ("crowdstrike", "CrowdStrike"),
        ("sentinelone", "SentinelOne"),
        ("wiz", "Wiz"),
        ("orca", "Orca Security"),
        ("lacework", "Lacework"),
        ("prismacloud", "Prisma Cloud"),
        ("checkov", "Checkov"),
        ("tfsec", "tfsec"),
        ("terrascan", "Terrascan"),
        ("kics", "KICS"),
        ("owasp", "OWASP"),
        ("burpsuite", "Burp Suite"),
        ("zaproxy", "OWASP ZAP"),
        ("nessus", "Nessus"),
        ("qualys", "Qualys"),
        ("rapid7", "Rapid7"),
        ("tenable", "Tenable"),
        ("hashicorp", "HashiCorp"),
        ("cyberark", "CyberArk"),
        ("beyondtrust", "BeyondTrust"),
        ("duo", "Duo Security"),
        ("ping", "Ping Identity"),
        ("onelogin", "OneLogin"),
        ("jumpcloud", "JumpCloud"),
        ("clerk", "Clerk"),
        ("supertokens", "SuperTokens"),
        ("fusionauth", "FusionAuth"),
        ("ory", "Ory"),
        ("stytch", "Stytch"),
        ("workos", "WorkOS"),
    ],
    "messaging": [
        ("slack", "Slack"),
        ("discord", "Discord"),
        ("zoom", "Zoom"),
        ("webex", "Webex"),
        ("mattermost", "Mattermost"),
        ("matrix", "Matrix"),
        ("telegram", "Telegram"),
        ("signal", "Signal"),
        ("mailchimp", "Mailchimp"),
        ("microsoftteams", "Microsoft Teams"),
        ("googlechat", "Google Chat"),
        ("twilio", "Twilio"),
        ("sendgrid", "SendGrid"),
        ("postmark", "Postmark"),
        ("mailgun", "Mailgun"),
        ("amazonses", "Amazon SES"),
        ("resend", "Resend"),
        ("brevo", "Brevo"),
        ("convertkit", "ConvertKit"),
        ("klaviyo", "Klaviyo"),
        ("intercom", "Intercom"),
        ("drift", "Drift"),
        ("crisp", "Crisp"),
        ("zendesk", "Zendesk"),
        ("freshdesk", "Freshdesk"),
        ("helpscout", "Help Scout"),
        ("front", "Front"),
        ("loom", "Loom"),
        ("calendly", "Calendly"),
        ("cal", "Cal.com"),
    ],
    "productivity": [
        # Productivity & Project Management
        ("jira", "Jira"),
        ("asana", "Asana"),
        ("trello", "Trello"),
        ("linear", "Linear"),
        ("monday", "Monday.com"),
        ("notion", "Notion"),
        ("confluence", "Confluence"),
        ("figma", "Figma"),
        ("sketch", "Sketch"),
        ("adobexd", "Adobe XD"),
        ("invision", "InVision"),
        ("zeplin", "Zeplin"),
        ("miro", "Miro"),
        ("lucid", "Lucidchart"),
        ("whimsical", "Whimsical"),
        ("excalidraw", "Excalidraw"),
        ("canva", "Canva"),
        ("airtable", "Airtable"),
        ("coda", "Coda"),
        ("clickup", "ClickUp"),
        ("basecamp", "Basecamp"),
        ("wrike", "Wrike"),
        ("smartsheet", "Smartsheet"),
        ("todoist", "Todoist"),
        ("obsidian", "Obsidian"),
        ("roamresearch", "Roam Research"),
        ("logseq", "Logseq"),
        ("craft", "Craft"),
        ("bear", "Bear"),
        ("ulysses", "Ulysses"),
        ("dropbox", "Dropbox"),
        ("box", "Box"),
        ("onedrive", "OneDrive"),
        ("icloud", "iCloud"),
    ],
    "analytics": [
        # Analytics & BI
        ("tableau", "Tableau"),
        ("powerbi", "Power BI"),
        ("metabase", "Metabase"),
        ("mixpanel", "Mixpanel"),
        ("amplitude", "Amplitude"),
        ("posthog", "PostHog"),
        ("heap", "Heap"),
        ("fullstory", "FullStory"),
        ("hotjar", "Hotjar"),
        ("logrocket", "LogRocket"),
        ("segment", "Segment"),
        ("rudderstack", "RudderStack"),
        ("mparticle", "mParticle"),
        ("googleanalytics", "Google Analytics"),
        ("plausible", "Plausible"),
        ("fathom", "Fathom Analytics"),
        ("umami", "Umami"),
        ("matomo", "Matomo"),
        ("countly", "Countly"),
        ("clevertap", "CleverTap"),
        ("braze", "Braze"),
        ("onesignal", "OneSignal"),
        ("firebase", "Firebase Analytics"),
        ("appsflyer", "AppsFlyer"),
        ("adjust", "Adjust"),
        ("branch", "Branch"),
        ("singular", "Singular"),
        ("mode", "Mode"),
        ("sigma", "Sigma"),
        ("preset", "Preset"),
        ("superset", "Apache Superset"),
        ("redash", "Redash"),
        ("lightdash", "Lightdash"),
        ("cube", "Cube"),
    ],
    "data-engineering": [
        # Data Engineering
        ("airbyte", "Airbyte"),
        ("fivetran", "Fivetran"),
        ("dbt", "dbt"),
        ("prefect", "Prefect"),
        ("dagster", "Dagster"),
        ("mage", "Mage"),
        ("kestra", "Kestra"),
        ("temporal", "Temporal"),
        ("luigi", "Luigi"),
        ("argo", "Argo Workflows"),
        ("stitch", "Stitch"),
        ("matillion", "Matillion"),
        ("talend", "Talend"),
        ("informatica", "Informatica"),
        ("alteryx", "Alteryx"),
        ("dataform", "Dataform"),
        ("sqlmesh", "SQLMesh"),
        ("greatexpectations", "Great Expectations"),
        ("soda", "Soda"),
        ("montecarlo", "Monte Carlo"),
        ("atlan", "Atlan"),
        ("alation", "Alation"),
        ("collibra", "Collibra"),
        ("datahub", "DataHub"),
        ("amundsen", "Amundsen"),
        ("openmetadata", "OpenMetadata"),
        ("delta", "Delta Lake"),
        ("iceberg", "Apache Iceberg"),
        ("hudi", "Apache Hudi"),
    ],
    "vector-db": [
        # Vector Databases
        ("pinecone", "Pinecone"),
        ("weaviate", "Weaviate"),
        ("milvus", "Milvus"),
        ("qdrant", "Qdrant"),
        ("chroma", "Chroma"),
        ("pgvector", "pgvector"),
        ("vespa", "Vespa"),
        ("marqo", "Marqo"),
        ("zilliz", "Zilliz"),
        ("vald", "Vald"),
        # Search Engines
        ("typesense", "Typesense"),
        ("meilisearch", "Meilisearch"),
        ("algolia", "Algolia"),
        ("elasticsearch", "Elasticsearch"),
        ("opensearch", "OpenSearch"),
        ("solr", "Apache Solr"),
        ("sphinx", "Sphinx"),
        # Hybrid Search
        ("lancedb", "LanceDB"),
        ("singlestore", "SingleStore"),
        ("rockset", "Rockset"),
        ("clickhouse", "ClickHouse"),
        ("duckdb", "DuckDB"),
        ("supabase", "Supabase Vector"),
        ("neon", "Neon pgvector"),
    ],
    "payments": [
        # Payments & Fintech
        ("stripe", "Stripe"),
        ("paypal", "PayPal"),
        ("square", "Square"),
        ("braintree", "Braintree"),
        ("adyen", "Adyen"),
        ("shopify", "Shopify"),
        ("woocommerce", "WooCommerce"),
        ("magento", "Magento"),
        ("bigcommerce", "BigCommerce"),
        ("paddle", "Paddle"),
        ("lemonsqueezy", "Lemon Squeezy"),
        ("gumroad", "Gumroad"),
        ("chargebee", "Chargebee"),
        ("recurly", "Recurly"),
        ("zuora", "Zuora"),
        ("plaid", "Plaid"),
        ("wise", "Wise"),
        ("revolut", "Revolut"),
        ("mercury", "Mercury"),
        ("ramp", "Ramp"),
        ("brex", "Brex"),
        ("moov", "Moov"),
        ("dwolla", "Dwolla"),
        ("marqeta", "Marqeta"),
    ],
    "crm": [
        # CRM & Sales
        ("salesforce", "Salesforce"),
        ("hubspot", "HubSpot"),
        ("pipedrive", "Pipedrive"),
        ("zoho", "Zoho"),
        ("freshsales", "Freshsales"),
        ("close", "Close"),
        ("copper", "Copper"),
        ("attio", "Attio"),
        ("folk", "Folk"),
        ("affinity", "Affinity"),
        ("apollo", "Apollo.io"),
        ("outreach", "Outreach"),
        ("salesloft", "SalesLoft"),
        ("gong", "Gong"),
        ("chorus", "Chorus"),
        ("clari", "Clari"),
        ("highspot", "Highspot"),
        ("seismic", "Seismic"),
        ("docusign", "DocuSign"),
        ("pandadoc", "PandaDoc"),
        ("proposify", "Proposify"),
    ],
    "version-control": [
        # Version Control & Code Hosting
        ("git", "Git"),
        ("github", "GitHub"),
        ("gitlab", "GitLab"),
        ("bitbucket", "Bitbucket"),
        ("gitea", "Gitea"),
        ("forgejo", "Forgejo"),
        ("sourcehut", "SourceHut"),
        ("codeberg", "Codeberg"),
        ("gitpod", "Gitpod"),
        ("coder", "Coder"),
        ("replit", "Replit"),
        ("codesandbox", "CodeSandbox"),
        ("stackblitz", "StackBlitz"),
        ("glitch", "Glitch"),
        ("codespaces", "GitHub Codespaces"),
        ("devpod", "DevPod"),
    ],
    "editors": [
        # Code Editors & IDEs
        ("jetbrains", "JetBrains"),
        ("intellijidea", "IntelliJ IDEA"),
        ("webstorm", "WebStorm"),
        ("pycharm", "PyCharm"),
        ("goland", "GoLand"),
        ("rider", "Rider"),
        ("datagrip", "DataGrip"),
        ("rubymine", "RubyMine"),
        ("phpstorm", "PhpStorm"),
        ("clion", "CLion"),
        ("androidstudio", "Android Studio"),
        ("xcode", "Xcode"),
        ("neovim", "Neovim"),
        ("vim", "Vim"),
        ("gnuemacs", "Emacs"),
        ("sublimetext", "Sublime Text"),
        ("notepadplusplus", "Notepad++"),
        ("cursor", "Cursor"),
        ("lapce", "Lapce"),
        ("helix", "Helix"),
    ],
    "hardware": [
        # Hardware & IoT
        ("raspberrypi", "Raspberry Pi"),
        ("arduino", "Arduino"),
        ("nvidia", "NVIDIA"),
        ("amd", "AMD"),
        ("intel", "Intel"),
        ("arm", "ARM"),
        ("qualcomm", "Qualcomm"),
        ("apple", "Apple"),
        ("samsung", "Samsung"),
        ("dell", "Dell"),
        ("hp", "HP"),
        ("lenovo", "Lenovo"),
        ("asus", "ASUS"),
        ("msi", "MSI"),
        ("gigabyte", "Gigabyte"),
        ("corsair", "Corsair"),
        ("logitech", "Logitech"),
        ("razer", "Razer"),
        ("steelseries", "SteelSeries"),
        ("espressif", "Espressif"),
        ("particle", "Particle"),
        ("adafruit", "Adafruit"),
        ("sparkfun", "SparkFun"),
        ("seeed", "Seeed Studio"),
        ("homeassistant", "Home Assistant"),
        ("openhab", "openHAB"),
        ("nodered", "Node-RED"),
        ("thingsboard", "ThingsBoard"),
        ("balena", "Balena"),
    ],
    "sponsors": [
        # AWS Community Day & Conference Sponsors
        # These are companies commonly seen as sponsors at AWS events
        # Source: Simple Icons (CC0 1.0) - simplified brand representations
        # Note: For official partner logos, check each company's brand guidelines
        
        # Consulting Partners (AWS Premier/Advanced)
        ("accenture", "Accenture"),
        ("infosys", "Infosys"),
        ("wipro", "Wipro"),
        ("tcs", "Tata Consultancy Services"),
        
        # Technology Partners - Observability & Monitoring
        ("datadog", "Datadog"),
        ("splunk", "Splunk"),
        ("newrelic", "New Relic"),
        ("dynatrace", "Dynatrace"),
        ("elastic", "Elastic"),
        ("pagerduty", "PagerDuty"),
        
        # Technology Partners - Data & Analytics
        ("snowflake", "Snowflake"),
        ("databricks", "Databricks"),
        ("mongodb", "MongoDB"),
        ("netapp", "NetApp"),
        
        # Technology Partners - Infrastructure & DevOps
        ("hashicorp", "HashiCorp"),
        ("vmware", "VMware"),
        ("redhat", "Red Hat"),
        ("suse", "SUSE"),
        ("canonical", "Canonical"),
        
        # Technology Partners - Security
        ("paloaltonetworks", "Palo Alto Networks"),
        ("fortinet", "Fortinet"),
        ("okta", "Okta"),
        ("auth0", "Auth0"),
        ("snyk", "Snyk"),
        ("trivy", "Trivy"),
        ("sonar", "SonarQube"),
        ("aqua", "Aqua Security"),
        
        # Technology Partners - DevOps & Collaboration
        ("atlassian", "Atlassian"),
        ("jira", "Jira"),
        ("confluence", "Confluence"),
        ("bitbucket", "Bitbucket"),
    ],
    "blockchain": [
        # Blockchain & Web3
        ("ethereum", "Ethereum"),
        ("bitcoin", "Bitcoin"),
        ("solana", "Solana"),
        ("polygon", "Polygon"),
        ("avalanche", "Avalanche"),
        ("binance", "Binance"),
        ("cardano", "Cardano"),
        ("polkadot", "Polkadot"),
        ("cosmos", "Cosmos"),
        ("near", "NEAR Protocol"),
        ("algorand", "Algorand"),
        ("tezos", "Tezos"),
        ("fantom", "Fantom"),
        ("arbitrum", "Arbitrum"),
        ("optimism", "Optimism"),
        ("base", "Base"),
        ("metamask", "MetaMask"),
        ("walletconnect", "WalletConnect"),
        ("rainbow", "Rainbow"),
        ("coinbase", "Coinbase"),
        ("opensea", "OpenSea"),
        ("uniswap", "Uniswap"),
        ("aave", "Aave"),
        ("chainlink", "Chainlink"),
        ("thegraph", "The Graph"),
        ("alchemy", "Alchemy"),
        ("infura", "Infura"),
        ("moralis", "Moralis"),
        ("hardhat", "Hardhat"),
        ("foundry", "Foundry"),
        ("truffle", "Truffle"),
        ("remix", "Remix IDE"),
        ("openzeppelin", "OpenZeppelin"),
        ("ipfs", "IPFS"),
        ("filecoin", "Filecoin"),
        ("arweave", "Arweave"),
    ],
}


# ── State helpers ─────────────────────────────────────────────────────────────

def _load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def _save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))


# ── PNG generation ────────────────────────────────────────────────────────────

def _svg_to_png(svg_path: Path, out_path: Path, size: int) -> None:
    try:
        import cairosvg
        cairosvg.svg2png(url=str(svg_path), write_to=str(out_path), output_width=size, output_height=size)
    except Exception as exc:
        logger.warning("cairosvg failed for %s: %s — skipping PNG", svg_path.name, exc)


# ── Download icons ────────────────────────────────────────────────────────────

def _download_simple_icon(slug: str, color: str = "currentColor") -> Optional[bytes]:
    """Download an SVG from Simple Icons CDN."""
    # Try the CDN first (supports color parameter)
    url = f"{SIMPLE_ICONS_CDN}/{slug}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code == 200:
            svg_content = resp.text
            # Simple Icons CDN returns SVG with fill="currentColor" by default
            # We want to keep it that way for theming flexibility
            return svg_content.encode('utf-8')
    except Exception as exc:
        logger.debug("CDN failed for %s: %s", slug, exc)
    
    # Fallback: try raw GitHub
    raw_url = f"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/{slug}.svg"
    try:
        resp = requests.get(raw_url, headers=HEADERS, timeout=15)
        if resp.status_code == 200:
            return resp.content
    except Exception as exc:
        logger.debug("GitHub raw failed for %s: %s", slug, exc)
    
    return None


def _process_icons(force: bool = False) -> dict[str, list[str]]:
    """
    Download curated icons, write to out_dir.
    Returns {added: [], removed: [], changed: []}.
    """
    added: list[str] = []
    failed: list[str] = []
    
    # Track existing files
    existing_names: set[str] = set()
    for cat_dir in OUT_DIR.glob("*"):
        if cat_dir.is_dir():
            for svg in cat_dir.glob("*.svg"):
                existing_names.add(f"{cat_dir.name}/{svg.stem}")
    
    written: set[str] = set()
    
    for category, icons in CURATED_ICONS.items():
        cat_dir = OUT_DIR / category
        cat_dir.mkdir(parents=True, exist_ok=True)
        
        for slug, display_name in icons:
            icon_key = f"{category}/{slug}"
            
            # Skip if already exists and not forcing
            svg_path = cat_dir / f"{slug}.svg"
            if svg_path.exists() and not force:
                written.add(icon_key)
                continue
            
            logger.info("Downloading %s (%s)...", slug, display_name)
            svg_bytes = _download_simple_icon(slug)
            
            if svg_bytes:
                svg_path.write_bytes(svg_bytes)
                
                # Generate PNGs
                _svg_to_png(svg_path, cat_dir / f"{slug}.png", 256)
                _svg_to_png(svg_path, cat_dir / f"{slug}@2x.png", 512)
                
                written.add(icon_key)
                if icon_key not in existing_names:
                    added.append(icon_key)
                
                logger.info("  ✓ %s", slug)
            else:
                failed.append(f"{category}/{slug}")
                logger.warning("  ✗ Failed to download %s", slug)
    
    removed = [n for n in existing_names if n not in written]
    
    if failed:
        logger.warning("Failed to download %d icons: %s", len(failed), failed[:10])
    
    return {"added": added, "removed": removed, "changed": [], "failed": failed}


# ── Public entry point ────────────────────────────────────────────────────────

def sync_community(force: bool = False) -> dict:
    """
    Main entry point called by the GHA workflow.
    Returns change summary dict.
    """
    state = _load_state()
    last_sync = state.get("community_last_sync", "")
    today = date.today().isoformat()
    
    # Only sync once per week unless forced
    if not force and last_sync == today:
        logger.info("Community icons: already synced today — skipping")
        return {"platform": "community", "status": "skipped", "added": [], "removed": [], "changed": []}
    
    try:
        changes = _process_icons(force=force)
    except Exception as exc:
        logger.error("Failed to sync community icons: %s", exc)
        return {"platform": "community", "status": "error", "error": str(exc)}
    
    # Update state
    state["community_last_sync"] = today
    _save_state(state)
    
    logger.info(
        "Community sync complete: +%d added  -%d removed  %d failed",
        len(changes["added"]), len(changes["removed"]), len(changes.get("failed", [])),
    )
    return {"platform": "community", "status": "updated", **changes}


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    force = "--force" in sys.argv
    result = sync_community(force=force)
    print(json.dumps(result, indent=2))
