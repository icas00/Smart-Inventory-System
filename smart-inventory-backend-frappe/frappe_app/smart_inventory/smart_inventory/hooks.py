# UK English comments
# hooks.py - Frappe app hooks for Smart Inventory

app_name = "smart_inventory"
app_title = "Smart Inventory"
app_publisher = "Your Name"
app_description = "Inventory and Orders Management for recruiter portfolio"
app_icon = "octicon octicon-package"
app_color = "grey"
app_email = "youremail@example.com"
app_license = "MIT"
app_version = "0.1.0"

# Include custom API endpoints
doc_events = {
    "*": {
        # You can add document hooks here if needed
    }
}

# Expose REST API
# Use @frappe.whitelist() in doctype controllers

# Scheduled Tasks (if any)
scheduler_events = {
    "daily": [
        # "smart_inventory.tasks.daily_tasks"
    ]
}

# Permissions are managed via DocType settings and roles
