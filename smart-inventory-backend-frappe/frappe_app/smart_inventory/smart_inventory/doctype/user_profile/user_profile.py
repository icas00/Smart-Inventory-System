# UK English comments
# user_profile.py - handles user registration, login, and role-based access

import frappe
from frappe.model.document import Document
from werkzeug.security import generate_password_hash, check_password_hash

class UserProfile(Document):
    def before_insert(self):
        """Hash password before saving"""
        if self.password:
            self.password = generate_password_hash(self.password)

@frappe.whitelist(allow_guest=True)
def register_user(first_name, last_name="", email=None, password=None, role="Customer"):
    """
    Register a new user
    """
    if not email or not password:
        frappe.throw("Email and password are required.")

    if frappe.db.exists("User Profile", {"email": email}):
        frappe.throw("Email already exists.")

    user = frappe.get_doc({
        "doctype": "User Profile",
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "role": role
    })
    user.insert()
    frappe.db.commit()
    return {"message": "User registered successfully", "user": user.as_dict()}

@frappe.whitelist(allow_guest=True)
def login_user(email, password):
    """
    Login a user and return user info
    """
    user = frappe.get_doc("User Profile", {"email": email})
    if not user:
        frappe.throw("User not found")

    if not check_password_hash(user.password, password):
        frappe.throw("Incorrect password")

    # Return user info (omit password)
    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "role": user.role
    }

@frappe.whitelist(allow_guest=False)
def get_users(role=None, limit=50, start=0):
    """
    Retrieve users. Optional filter by role.
    """
    filters = {}
    if role:
        filters["role"] = role

    users = frappe.get_all(
        "User Profile",
        filters=filters,
        fields=["name","first_name","last_name","email","role"],
        limit_page_length=int(limit),
        start=int(start)
    )
    return users
