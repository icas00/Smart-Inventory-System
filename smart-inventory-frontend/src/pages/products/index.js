import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ProductForm from '../../components/ProductForm';
import ProductTable from '../../components/ProductTable';
import { fetchProducts } from '../../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const p = await fetchProducts();
      setProducts(p);
    } catch (e) { console.error(e); }
  };

  useEffect(()=> { load(); }, []);

  return (
    <Layout>
      <div className="header"><h1>Inventory</h1></div>
      <ProductForm onSaved={load} editing={editing} />
      <ProductTable products={products} onEdit={setEditing} onDeleted={load} />
    </Layout>
  );
}
