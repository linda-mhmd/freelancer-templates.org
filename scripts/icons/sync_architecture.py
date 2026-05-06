#!/usr/bin/env python3
"""
sync_architecture.py — Generate generic architecture icons from Lucide.

Creates SVG icons for common architecture diagram elements that aren't
covered by cloud-specific icons. Uses Lucide icons (MIT License).

Run: python scripts/icons/sync_architecture.py
"""

from __future__ import annotations

import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

REPO_ROOT = Path(__file__).resolve().parents[2]
ARCH_DIR = REPO_ROOT / "static/icons/architecture"

# Lucide icon mappings for architecture elements
# Format: "our-icon-id": {"lucide": "lucide-icon-name", "name": "Display Name", "category": "category"}
ARCHITECTURE_ICONS = {
    # Users & People
    "user": {"lucide": "user", "name": "User", "category": "people"},
    "users": {"lucide": "users", "name": "Users / Team", "category": "people"},
    "user-check": {"lucide": "user-check", "name": "Authenticated User", "category": "people"},
    "user-cog": {"lucide": "user-cog", "name": "Admin User", "category": "people"},
    
    # Buildings & Locations
    "building": {"lucide": "building-2", "name": "Building / Office", "category": "locations"},
    "factory": {"lucide": "factory", "name": "Factory / Data Center", "category": "locations"},
    "warehouse": {"lucide": "warehouse", "name": "Warehouse", "category": "locations"},
    "home": {"lucide": "home", "name": "Home / On-Premises", "category": "locations"},
    "globe": {"lucide": "globe", "name": "Internet / Global", "category": "locations"},
    "map-pin": {"lucide": "map-pin", "name": "Location", "category": "locations"},
    
    # Devices
    "server": {"lucide": "server", "name": "Server", "category": "devices"},
    "server-cog": {"lucide": "server-cog", "name": "Managed Server", "category": "devices"},
    "server-crash": {"lucide": "server-crash", "name": "Server Error", "category": "devices"},
    "desktop": {"lucide": "monitor", "name": "Desktop Computer", "category": "devices"},
    "laptop": {"lucide": "laptop", "name": "Laptop", "category": "devices"},
    "smartphone": {"lucide": "smartphone", "name": "Mobile Phone", "category": "devices"},
    "tablet": {"lucide": "tablet", "name": "Tablet", "category": "devices"},
    "watch": {"lucide": "watch", "name": "Smartwatch", "category": "devices"},
    "tv": {"lucide": "tv", "name": "Display / TV", "category": "devices"},
    "printer": {"lucide": "printer", "name": "Printer", "category": "devices"},
    "router": {"lucide": "router", "name": "Router", "category": "devices"},
    "hard-drive": {"lucide": "hard-drive", "name": "Storage Drive", "category": "devices"},
    
    # Cloud & Infrastructure
    "cloud": {"lucide": "cloud", "name": "Cloud", "category": "infrastructure"},
    "cloud-cog": {"lucide": "cloud-cog", "name": "Cloud Service", "category": "infrastructure"},
    "cloud-download": {"lucide": "cloud-download", "name": "Cloud Download", "category": "infrastructure"},
    "cloud-upload": {"lucide": "cloud-upload", "name": "Cloud Upload", "category": "infrastructure"},
    "cloud-off": {"lucide": "cloud-off", "name": "Offline / No Cloud", "category": "infrastructure"},
    "database": {"lucide": "database", "name": "Database", "category": "infrastructure"},
    "database-backup": {"lucide": "database-backup", "name": "Database Backup", "category": "infrastructure"},
    "cylinder": {"lucide": "cylinder", "name": "Data Store", "category": "infrastructure"},
    "container": {"lucide": "box", "name": "Container", "category": "infrastructure"},
    "boxes": {"lucide": "boxes", "name": "Containers / Cluster", "category": "infrastructure"},
    "package": {"lucide": "package", "name": "Package / Module", "category": "infrastructure"},
    
    # Networking
    "network": {"lucide": "network", "name": "Network", "category": "networking"},
    "wifi": {"lucide": "wifi", "name": "WiFi / Wireless", "category": "networking"},
    "wifi-off": {"lucide": "wifi-off", "name": "No WiFi", "category": "networking"},
    "ethernet": {"lucide": "cable", "name": "Ethernet / Wired", "category": "networking"},
    "signal": {"lucide": "signal", "name": "Signal / Connectivity", "category": "networking"},
    "radio": {"lucide": "radio", "name": "Radio / Broadcast", "category": "networking"},
    "satellite": {"lucide": "satellite", "name": "Satellite", "category": "networking"},
    "antenna": {"lucide": "antenna", "name": "Antenna", "category": "networking"},
    
    # Security
    "shield": {"lucide": "shield", "name": "Security / Shield", "category": "security"},
    "shield-check": {"lucide": "shield-check", "name": "Verified / Secure", "category": "security"},
    "shield-alert": {"lucide": "shield-alert", "name": "Security Alert", "category": "security"},
    "shield-off": {"lucide": "shield-off", "name": "Unprotected", "category": "security"},
    "lock": {"lucide": "lock", "name": "Locked / Encrypted", "category": "security"},
    "unlock": {"lucide": "unlock", "name": "Unlocked", "category": "security"},
    "key": {"lucide": "key", "name": "Key / Credential", "category": "security"},
    "key-round": {"lucide": "key-round", "name": "API Key", "category": "security"},
    "fingerprint": {"lucide": "fingerprint", "name": "Biometric", "category": "security"},
    "scan": {"lucide": "scan", "name": "Scan / Verify", "category": "security"},
    "eye": {"lucide": "eye", "name": "Visible / Monitoring", "category": "security"},
    "eye-off": {"lucide": "eye-off", "name": "Hidden / Private", "category": "security"},
    
    # APIs & Integration
    "api": {"lucide": "plug", "name": "API / Integration", "category": "integration"},
    "webhook": {"lucide": "webhook", "name": "Webhook", "category": "integration"},
    "link": {"lucide": "link", "name": "Link / Connection", "category": "integration"},
    "unlink": {"lucide": "unlink", "name": "Disconnected", "category": "integration"},
    "share": {"lucide": "share-2", "name": "Share / Distribute", "category": "integration"},
    "git-branch": {"lucide": "git-branch", "name": "Branch / Fork", "category": "integration"},
    "git-merge": {"lucide": "git-merge", "name": "Merge", "category": "integration"},
    "git-pull-request": {"lucide": "git-pull-request", "name": "Pull Request", "category": "integration"},
    
    # Data Flow
    "arrow-right": {"lucide": "arrow-right", "name": "Flow Right", "category": "flow"},
    "arrow-left": {"lucide": "arrow-left", "name": "Flow Left", "category": "flow"},
    "arrow-up": {"lucide": "arrow-up", "name": "Flow Up", "category": "flow"},
    "arrow-down": {"lucide": "arrow-down", "name": "Flow Down", "category": "flow"},
    "arrows-right-left": {"lucide": "arrow-left-right", "name": "Bidirectional", "category": "flow"},
    "repeat": {"lucide": "repeat", "name": "Loop / Cycle", "category": "flow"},
    "refresh": {"lucide": "refresh-cw", "name": "Refresh / Sync", "category": "flow"},
    "shuffle": {"lucide": "shuffle", "name": "Random / Shuffle", "category": "flow"},
    "split": {"lucide": "split", "name": "Split / Fork", "category": "flow"},
    "merge": {"lucide": "merge", "name": "Merge / Join", "category": "flow"},
    
    # Status & State
    "check": {"lucide": "check", "name": "Success / Check", "category": "status"},
    "check-circle": {"lucide": "check-circle", "name": "Verified", "category": "status"},
    "x": {"lucide": "x", "name": "Error / Close", "category": "status"},
    "x-circle": {"lucide": "x-circle", "name": "Failed", "category": "status"},
    "alert-triangle": {"lucide": "alert-triangle", "name": "Warning", "category": "status"},
    "alert-circle": {"lucide": "alert-circle", "name": "Alert", "category": "status"},
    "info": {"lucide": "info", "name": "Info", "category": "status"},
    "help-circle": {"lucide": "help-circle", "name": "Help / Unknown", "category": "status"},
    "loader": {"lucide": "loader", "name": "Loading", "category": "status"},
    "clock": {"lucide": "clock", "name": "Time / Pending", "category": "status"},
    "timer": {"lucide": "timer", "name": "Timer / Timeout", "category": "status"},
    "hourglass": {"lucide": "hourglass", "name": "Processing", "category": "status"},
    "pause": {"lucide": "pause", "name": "Paused", "category": "status"},
    "play": {"lucide": "play", "name": "Running", "category": "status"},
    "stop": {"lucide": "square", "name": "Stopped", "category": "status"},
    
    # Business & Process
    "file": {"lucide": "file", "name": "File / Document", "category": "business"},
    "file-text": {"lucide": "file-text", "name": "Text Document", "category": "business"},
    "file-code": {"lucide": "file-code", "name": "Code File", "category": "business"},
    "file-json": {"lucide": "file-json", "name": "JSON File", "category": "business"},
    "folder": {"lucide": "folder", "name": "Folder", "category": "business"},
    "folder-open": {"lucide": "folder-open", "name": "Open Folder", "category": "business"},
    "archive": {"lucide": "archive", "name": "Archive", "category": "business"},
    "inbox": {"lucide": "inbox", "name": "Inbox / Queue", "category": "business"},
    "mail": {"lucide": "mail", "name": "Email", "category": "business"},
    "message-square": {"lucide": "message-square", "name": "Message / Chat", "category": "business"},
    "bell": {"lucide": "bell", "name": "Notification", "category": "business"},
    "calendar": {"lucide": "calendar", "name": "Calendar / Schedule", "category": "business"},
    "clipboard": {"lucide": "clipboard", "name": "Clipboard / Task", "category": "business"},
    "list": {"lucide": "list", "name": "List", "category": "business"},
    "kanban": {"lucide": "kanban", "name": "Kanban Board", "category": "business"},
    
    # Analytics & Monitoring
    "chart-bar": {"lucide": "bar-chart-3", "name": "Bar Chart", "category": "analytics"},
    "chart-line": {"lucide": "line-chart", "name": "Line Chart", "category": "analytics"},
    "chart-pie": {"lucide": "pie-chart", "name": "Pie Chart", "category": "analytics"},
    "trending-up": {"lucide": "trending-up", "name": "Trending Up", "category": "analytics"},
    "trending-down": {"lucide": "trending-down", "name": "Trending Down", "category": "analytics"},
    "activity": {"lucide": "activity", "name": "Activity / Metrics", "category": "analytics"},
    "gauge": {"lucide": "gauge", "name": "Gauge / Performance", "category": "analytics"},
    "target": {"lucide": "target", "name": "Target / Goal", "category": "analytics"},
    
    # Settings & Configuration
    "settings": {"lucide": "settings", "name": "Settings", "category": "config"},
    "sliders": {"lucide": "sliders-horizontal", "name": "Configuration", "category": "config"},
    "wrench": {"lucide": "wrench", "name": "Tools / Maintenance", "category": "config"},
    "hammer": {"lucide": "hammer", "name": "Build", "category": "config"},
    "cog": {"lucide": "cog", "name": "Cog / Process", "category": "config"},
    "cpu": {"lucide": "cpu", "name": "CPU / Processor", "category": "config"},
    "memory": {"lucide": "memory-stick", "name": "Memory / RAM", "category": "config"},
    "terminal": {"lucide": "terminal", "name": "Terminal / CLI", "category": "config"},
    "code": {"lucide": "code", "name": "Code", "category": "config"},
    "binary": {"lucide": "binary", "name": "Binary / Data", "category": "config"},
    
    # AI & ML
    "brain": {"lucide": "brain", "name": "AI / Brain", "category": "ai"},
    "bot": {"lucide": "bot", "name": "Bot / Agent", "category": "ai"},
    "sparkles": {"lucide": "sparkles", "name": "AI Magic", "category": "ai"},
    "wand": {"lucide": "wand-2", "name": "AI Generation", "category": "ai"},
    "zap": {"lucide": "zap", "name": "Fast / Lightning", "category": "ai"},
    
    # Money & Commerce
    "dollar": {"lucide": "dollar-sign", "name": "Dollar / Cost", "category": "commerce"},
    "credit-card": {"lucide": "credit-card", "name": "Payment", "category": "commerce"},
    "wallet": {"lucide": "wallet", "name": "Wallet", "category": "commerce"},
    "receipt": {"lucide": "receipt", "name": "Receipt / Invoice", "category": "commerce"},
    "shopping-cart": {"lucide": "shopping-cart", "name": "Cart / E-commerce", "category": "commerce"},
    "store": {"lucide": "store", "name": "Store / Shop", "category": "commerce"},
}

# SVG template using Lucide icon paths
SVG_TEMPLATE = '''<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- {name} - Source: Lucide Icons (MIT License) -->
  {path}
</svg>'''


def create_metadata() -> dict:
    """Create metadata for architecture icons."""
    metadata = {
        "source": "Lucide Icons",
        "license": "MIT License (ISC)",
        "license_url": "https://lucide.dev/license",
        "attribution": "Lucide Contributors - https://lucide.dev",
        "note": "These icons are derived from Lucide Icons for use in architecture diagrams.",
        "categories": {
            "people": {"name": "People & Users", "description": "User and team icons"},
            "locations": {"name": "Locations", "description": "Buildings, offices, and geographic elements"},
            "devices": {"name": "Devices", "description": "Hardware and device icons"},
            "infrastructure": {"name": "Infrastructure", "description": "Cloud and infrastructure elements"},
            "networking": {"name": "Networking", "description": "Network and connectivity icons"},
            "security": {"name": "Security", "description": "Security and access control icons"},
            "integration": {"name": "Integration", "description": "APIs, webhooks, and integration icons"},
            "flow": {"name": "Data Flow", "description": "Arrows and flow indicators"},
            "status": {"name": "Status", "description": "Status and state indicators"},
            "business": {"name": "Business", "description": "Documents, files, and business process icons"},
            "analytics": {"name": "Analytics", "description": "Charts and monitoring icons"},
            "config": {"name": "Configuration", "description": "Settings and configuration icons"},
            "ai": {"name": "AI & ML", "description": "Artificial intelligence icons"},
            "commerce": {"name": "Commerce", "description": "Payment and e-commerce icons"},
        },
        "icons": {}
    }
    
    for icon_id, config in ARCHITECTURE_ICONS.items():
        metadata["icons"][icon_id] = {
            "name": config["name"],
            "category": config["category"],
            "lucide_source": config["lucide"]
        }
    
    return metadata


def sync_architecture():
    """
    Create architecture icon metadata.
    
    Note: We don't actually generate SVG files here because Lucide icons
    are already available via the lucide.createIcons() JavaScript on the site.
    Instead, we create metadata that the manifest generator can use.
    """
    logger.info("Creating architecture icon metadata...")
    
    ARCH_DIR.mkdir(parents=True, exist_ok=True)
    
    # Write metadata
    metadata = create_metadata()
    metadata_path = ARCH_DIR / "metadata.json"
    metadata_path.write_text(json.dumps(metadata, indent=2))
    logger.info("Wrote architecture metadata to %s", metadata_path)
    
    # Create a README explaining these icons
    readme = """# Architecture Icons

These icons are sourced from [Lucide Icons](https://lucide.dev) (MIT License).

## Usage

Since Lucide is already loaded on the site via JavaScript, these icons are 
available directly using the `<i data-lucide="icon-name"></i>` syntax.

For architecture diagrams, you can also download SVG versions from the icon browser.

## Categories

- **People & Users**: User, team, and authentication icons
- **Locations**: Buildings, data centers, geographic elements
- **Devices**: Servers, computers, mobile devices
- **Infrastructure**: Cloud, databases, containers
- **Networking**: Network, WiFi, connectivity
- **Security**: Shields, locks, encryption
- **Integration**: APIs, webhooks, connections
- **Data Flow**: Arrows, sync, merge indicators
- **Status**: Success, error, warning, loading states
- **Business**: Documents, files, notifications
- **Analytics**: Charts, metrics, monitoring
- **Configuration**: Settings, tools, terminal
- **AI & ML**: Brain, bot, AI-related icons
- **Commerce**: Payments, shopping, invoices

## License

MIT License - https://lucide.dev/license

Attribution: Lucide Contributors
"""
    readme_path = ARCH_DIR / "README.md"
    readme_path.write_text(readme)
    logger.info("Wrote README to %s", readme_path)
    
    logger.info("Architecture icon metadata created with %d icons", len(ARCHITECTURE_ICONS))


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    sync_architecture()
