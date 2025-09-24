import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { fetchProducts, fetchOrders } from '../services/api';
import ProductTable from '../components/ProductTable';
import OrderTable from '../components/OrderTable';
import ChartSales from '../components/ChartSales';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const p = await fetchProducts();
        setProducts(p);
      } catch (e) { console.error(e); }

      try {
        const o = await fetchOrders();
        setOrders(o);
      } catch (e) { console.error(e); }

      // simple mock sales aggregation for demo
      setSalesData([
        { day: '2025-09-20', total_sales: 12000 },
        { day: '2025-09-21', total_sales: 8000 },
        { day: '2025-09-22', total_sales: 15000 }
      ]);
    })();
  }, []);

  return (
    <Layout>
      <div className="header">
        <h1>Dashboard</h1>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:16}}>
        <div>
          <ProductTable products={products} />
        </div>
        <div>
          <ChartSales data={salesData} />
        </div>
      </div>

      <OrderTable orders={orders} />
    </Layout>
  );
}
