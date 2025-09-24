import React from 'react';
import Link from 'next/link';
import { loadUser, logout } from '../services/auth';

/**
 * Navbar - top navigation. Shows login/register when not authenticated.
 * Fully compatible with Next.js 15.
 */
export default function Navbar() {
  const user = typeof window !== 'undefined' ? loadUser() : null;

  return (
    <header className="card header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/images/logo.png" alt="logo" style={{ width: 36, height: 36 }} />
        <Link href="/" style={{ fontWeight: 700 }}>
          Smart Inventory
        </Link>
      </div>

      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link href="/">Dashboard</Link>
        <Link href="/products">Inventory</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/reports">Reports</Link>

        {user ? (
          <>
            <span style={{ color: '#374151' }}>{user.first_name || user.email}</span>
            <button className="btn secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
