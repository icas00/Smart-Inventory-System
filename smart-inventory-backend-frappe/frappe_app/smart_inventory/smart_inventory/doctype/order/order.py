# UK English comments
# order.py - business logic for Order DocType

import frappe
from frappe.model.document import Document

class Order(Document):
    def validate(self):
        """Calculate total_amount and validate order items"""
        total = 0
        if not self.order_items:
            frappe.throw("Order must have at least one item.")
        for item in self.order_items:
            if item.quantity <= 0:
                frappe.throw(f"Quantity for {item.product} must be greater than 0")
            if item.price is None:
                frappe.throw(f"Price for {item.product} is required")
            total += item.quantity * item.price
        self.total_amount = total

@frappe.whitelist(allow_guest=False)
def get_orders(customer=None, limit=50, start=0):
    """
    Retrieve orders. Optional: filter by customer.
    """
    filters = {}
    if customer:
        filters['customer'] = customer
    orders = frappe.get_all(
        'Order',
        filters=filters,
        fields=['name', 'customer', 'status', 'total_amount', 'creation'],
        limit_page_length=int(limit),
        start=int(start)
    )
    return orders

@frappe.whitelist(allow_guest=False)
def create_order(data):
    """
    Create a new order with items
    data: JSON dict with keys 'customer' and 'order_items' (list)
    """
    if isinstance(data, str):
        import json
        data = json.loads(data)

    order_doc = frappe.get_doc({
        'doctype': 'Order',
        'customer': data.get('customer'),
        'status': 'Created',
        'order_items': data.get('order_items')
    })
    order_doc.insert()
    frappe.db.commit()
    return order_doc.as_dict()
