import React from 'react';
import Navbar from './Navbar';

/**
 * Layout - basic page wrapper with Navbar and a centred main container.
 * Wraps all page content to ensure consistent header and styling.
 */
export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="container" style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
