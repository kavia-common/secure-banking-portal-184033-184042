import React from 'react';
import { NavLink } from 'react-router-dom';
import { OceanProfessionalTheme as theme } from '../theme';
import './layout.css';

// PUBLIC_INTERFACE
export function Layout({ children }) {
  /** App shell with side navigation and header. */
  return (
    <div className="shell" style={{ background: theme.colors.background }}>
      <aside className="sidebar" style={{ background: theme.colors.surface, boxShadow: theme.shadow.md }}>
        <div className="brand">
          <span className="logo" aria-hidden="true">🏦</span>
          <div>
            <div className="brand-title">Ocean Bank</div>
            <div className="brand-sub">Secure Portal</div>
          </div>
        </div>
        <nav className="nav">
          <NavLink end to="/" className="nav-item">Dashboard</NavLink>
          <NavLink to="/accounts" className="nav-item">Accounts</NavLink>
          <NavLink to="/transactions" className="nav-item">Transactions</NavLink>
          <NavLink to="/transfer" className="nav-item">Transfers</NavLink>
        </nav>
        <div className="sidebar-footer">
          <small>Mock Mode</small>
        </div>
      </aside>
      <main className="content">
        <header className="topbar" style={{ background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>
          <div className="topbar-title">Online Banking</div>
          <div className="topbar-actions">
            <button className="btn-primary" type="button">Support</button>
          </div>
        </header>
        <div className="main-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
