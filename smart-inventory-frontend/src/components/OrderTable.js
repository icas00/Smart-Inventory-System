import React from 'react';
import { currency, shortDate } from '../utils/format';

/**
 * OrderTable - simple orders list
 */
export default function OrderTable({ orders = [] }) {
  return (
    <div className="card">
      <h3>Orders</h3>
      <table className="table">
        <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Created</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.name || o.order_id}>
              <td>{o.name || o.order_id}</td>
              <td>{o.customer}</td>
              <td>{currency(o.total_amount || o.amount)}</td>
              <td>{o.status}</td>
              <td>{shortDate(o.creation)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
