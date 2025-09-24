# UK English comments
# product.py - business logic for Product Doctype

import frappe
from frappe.model.document import Document

class Product(Document):
    def validate(self):
        """Ensure price is set and quantity is non-negative"""
        if self.price is None:
            frappe.throw("Price is required.")
        if self.quantity is None:
            self.quantity = 0
        if self.quantity < 0:
            frappe.throw("Quantity cannot be negative.")

# Exposed REST API endpoints
@frappe.whitelist(allow_guest=False)
def get_products(limit=50, start=0):
    """
    Retrieve products for frontend consumption
    """
    products = frappe.get_all(
        'Product',
        fields=['name','sku','price','quantity','description','re_order_level'],
        limit_page_length=int(limit),
        start=int(start)
    )
    return products

@frappe.whitelist()
def create_product(data):
    """
    Create a new product
    data: JSON dict with keys sku, name, price, cost, quantity, re_order_level
    """
    if isinstance(data, str):
        import json
        data = json.loads(data)

    doc = frappe.get_doc({
        'doctype': 'Product',
        'sku': data.get('sku'),
        'name': data.get('name'),
        'description': data.get('description'),
        'price': data.get('price'),
        'cost': data.get('cost', 0),
        'quantity': data.get('quantity', 0),
        're_order_level': data.get('re_order_level', 0)
    })
    doc.insert()
    frappe.db.commit()
    return doc.as_dict()
