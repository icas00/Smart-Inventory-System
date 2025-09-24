# UK English comments
# stock_movement.py - handles product inventory updates

import frappe
from frappe.model.document import Document

class StockMovement(Document):
    def validate(self):
        """Ensure quantity is positive and update product stock"""
        if self.quantity <= 0:
            frappe.throw("Quantity must be greater than zero")

        product = frappe.get_doc("Product", self.product)

        if self.movement_type == "IN":
            product.quantity += self.quantity
        elif self.movement_type == "OUT":
            if self.quantity > product.quantity:
                frappe.throw(f"Cannot remove {self.quantity} items from {self.product}. Only {product.quantity} in stock.")
            product.quantity -= self.quantity
        else:
            frappe.throw("Invalid movement type. Must be IN or OUT.")

        product.save()
        frappe.db.commit()

@frappe.whitelist(allow_guest=False)
def log_stock_movement(product, movement_type, quantity, description=""):
    """
    Create a stock movement record via API
    """
    doc = frappe.get_doc({
        'doctype': 'Stock Movement',
        'product': product,
        'movement_type': movement_type,
        'quantity': quantity,
        'description': description
    })
    doc.insert()
    frappe.db.commit()
    return doc.as_dict()

@frappe.whitelist(allow_guest=False)
def get_stock_movements(product=None, limit=50, start=0):
    """
    Retrieve stock movements. Optional filter by product.
    """
    filters = {}
    if product:
        filters['product'] = product
    movements = frappe.get_all(
        'Stock Movement',
        filters=filters,
        fields=['name','product','movement_type','quantity','description','creation'],
        limit_page_length=int(limit),
        start=int(start)
    )
    return movements
