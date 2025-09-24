import React, { useState } from 'react';
import Layout from '../components/Layout';
import { frappe } from '../services/api';
import { saveUser, saveToken } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      // calls Frappe login API if available; otherwise call custom endpoint
      const res = await frappe.post('/api/method/smart_inventory.user_profile.login_user', { email, password });
      const user = res.data.message || res.data;
      saveUser(user);
      // optional token storage (not implemented server-side)
      saveToken('demo-token');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + (err.response?.data?.exc || err.message));
    }
  };

  return (
    <Layout>
      <div style={{maxWidth:420,margin:'0 auto'}}>
        <h2>Login</h2>
        <form onSubmit={submit} className="card">
          <div className="form-row"><input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /></div>
          <div className="form-row"><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" /></div>
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
}
