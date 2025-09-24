# UK English comments
# api.py - helper API wrappers for common queries
import frappe
from frappe import _

@frappe.whitelist()
def get_sales_report(start_date=None, end_date=None):
    # Returns aggregated sales for charting
    start_date = start_date or frappe.utils.today()
    end_date = end_date or start_date
    # Example simple SQL aggregator
    data = frappe.db.sql("""
        SELECT DATE(`creation`) as day, SUM(grand_total) as total_sales
        FROM `tabSales Invoice`
        WHERE DATE(creation) BETWEEN %s AND %s
        GROUP BY DATE(creation)
        ORDER BY DATE(creation)
    """, (start_date, end_date), as_dict=1)
    return data
