import React, { useState } from 'react';
import Layout from '../components/Layout';
import { frappe } from '../services/api';

export default function Register() {
  const [first_name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await frappe.post('/api/method/smart_inventory.user_profile.register_user', { first_name, email, password });
      alert('Registration successful. Please login.');
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert('Register failed: ' + (err.response?.data?.exc || err.message));
    }
  };

  return (
    <Layout>
      <div style={{maxWidth:480,margin:'0 auto'}}>
        <h2>Register</h2>
        <form onSubmit={submit} className="card">
          <div className="form-row"><input required placeholder="First name" value={first_name} onChange={e=>setFirstName(e.target.value)} /></div>
          <div className="form-row"><input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="form-row"><input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <button className="btn" type="submit">Register</button>
        </form>
      </div>
    </Layout>
  );
}
