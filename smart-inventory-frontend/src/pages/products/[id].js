import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { frappe } from '../../services/api';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(()=> {
    if (!id) return;
    (async () => {
      try {
        // use get_doc if available; otherwise fetch via list and match
        const res = await frappe.get(`/api/resource/Product/${id}`);
        setProduct(res.data.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!product) return <Layout><div className="container card">Loading…</div></Layout>;

  return (
    <Layout>
      <div className="header"><h1>{product.name}</h1></div>
      <div className="card">
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <p><strong>Description:</strong> {product.description}</p>
      </div>
    </Layout>
  );
}
