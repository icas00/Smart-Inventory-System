# UK English comments
# Dockerfile for Smart Inventory Frappe backend

# Use official Frappe bench image
FROM frappe/erpnext-worker:version-14

# Set work directory
WORKDIR /home/frappe/frappe-bench

# Copy the app into the container
COPY ../frappe_app ./apps

# Install app dependencies
RUN bench get-app smart_inventory ./apps/smart_inventory
RUN bench --site site1.local install-app smart_inventory

# Expose port
EXPOSE 8000

# Start Frappe server
CMD ["bench", "start"]
