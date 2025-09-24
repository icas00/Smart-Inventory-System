import React, { useState, useEffect } from 'react';
import { createProduct } from '../services/api';

/**
 * ProductForm - form for adding or editing a product.
 * Props:
 * - onSaved(): callback after successful save
 * - editing: optional product object to pre-fill form (edit mode)
 * UK English comments used throughout.
 */
export default function ProductForm({ onSaved, editing }) {
  const [form, setForm] = useState({
    sku: '',
    name: '',
    price: 0,
    cost: 0,
    quantity: 0,
    description: ''
  });

  // Populate form when editing a product
  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      setForm({ sku: '', name: '', price: 0, cost: 0, quantity: 0, description: '' });
      onSaved?.();
      alert('Product saved successfully.');
    } catch (err) {
      console.error(err);
      alert('Save failed: ' + (err.response?.data?.exc || err.message));
    }
  };

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <h3>{editing ? 'Edit product' : 'Add product'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row" style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            required
            placeholder="SKU"
            value={form.sku}
            onChange={e => setForm({ ...form, sku: e.target.value })}
          />
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-row" style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Cost"
            value={form.cost}
            onChange={e => setForm({ ...form, cost: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button className="btn" type="submit">
          {editing ? 'Update product' : 'Save product'}
        </button>
      </form>
    </div>
  );
}
