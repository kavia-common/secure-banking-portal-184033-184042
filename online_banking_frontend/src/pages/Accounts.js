import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Panel } from '../components/ui';

// PUBLIC_INTERFACE
export default function Accounts() {
  /** Lists accounts with balances and links to details. */
  const { accounts, loading } = useApp();
  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid" style={{ gap: 16 }}>
      {accounts.map((a) => (
        <Panel
          key={a.id}
          title={`${a.name} (${a.type})`}
          right={<span className="badge">{a.numberMasked}</span>}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#6B7280', fontSize: 12 }}>Balance</div>
              <div style={{ fontWeight: 700, fontSize: 22 }}>
                {a.balance.toLocaleString('en-US', { style: 'currency', currency: a.currency || 'USD' })}
              </div>
            </div>
            <Link className="btn primary" to={`/accounts/${a.id}`}>View details</Link>
          </div>
        </Panel>
      ))}
    </div>
  );
}
