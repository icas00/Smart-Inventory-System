import React from 'react';
import { currency } from '../utils/format';

/**
 * ProductTable - displays a list of products in a table.
 * Supports optional edit and delete actions via callbacks.
 * UK English comments used throughout.
 */
export default function ProductTable({ products = [], onEdit, onDeleted }) {
  return (
    <div className="card">
      <h3>Products</h3>
      <table className="table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.name || product.sku}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{currency(product.price)}</td>
              <td>{product.quantity}</td>
              <td>
                {onEdit && (
                  <button
                    className="btn secondary"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>
                )}
                {onDeleted && (
                  <button
                    className="btn danger"
                    onClick={() => onDeleted(product)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
