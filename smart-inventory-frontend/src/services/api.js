// UK English comments: Axios wrapper to call Frappe and Payment backends.
// Use env vars if present.
import axios from 'axios';

const FRAPPE_BASE = process.env.NEXT_PUBLIC_FRAPPE || 'http://localhost:8000';
const PAYMENT_BASE = process.env.NEXT_PUBLIC_PAYMENTS || 'http://localhost:8081';

// Frappe client (for inventory/orders/users)
export const frappe = axios.create({
  baseURL: FRAPPE_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

// Payment client
export const payments = axios.create({
  baseURL: PAYMENT_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Convenience wrappers
export async function fetchProducts() {
  // Using the product api published in Frappe: /api/method/smart_inventory.product.get_products
  const res = await frappe.get('/api/method/smart_inventory.product.get_products');
  // Frappe wraps things in message or directly returns list depending on implementation; handle both.
  return res.data.message || res.data;
}

export async function createProduct(payload) {
  return frappe.post('/api/method/smart_inventory.product.create_product', payload);
}

export async function fetchOrders() {
  const res = await frappe.get('/api/method/smart_inventory.order.get_orders');
  return res.data.message || res.data;
}

// Payment: create Razorpay order via Spring service
export async function createRazorpayOrder(body) {
  return payments.post('/api/payments/create-order', body);
}
