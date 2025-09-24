import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * ChartSales - Recharts line chart for sales data
 * Expects `data` as [{ day: '2025-09-01', total_sales: 1500 }, ...]
 */
export default function ChartSales({ data = [] }) {
  return (
    <div className="card">
      <h3>Sales (recent)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total_sales" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
