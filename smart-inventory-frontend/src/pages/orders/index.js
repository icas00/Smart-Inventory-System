import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import OrderTable from '../../components/OrderTable';
import { fetchOrders } from '../../services/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(()=> {
    (async ()=> {
      try {
        const o = await fetchOrders();
        setOrders(o);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Layout>
      <div className="header"><h1>Orders</h1></div>
      <OrderTable orders={orders} />
    </Layout>
  );
}
