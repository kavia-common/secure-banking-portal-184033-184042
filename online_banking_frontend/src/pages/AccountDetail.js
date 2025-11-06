import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Panel, Table } from '../components/ui';
import { recentTransactionsForAccount } from '../data/sampleData';

// PUBLIC_INTERFACE
export default function AccountDetail() {
  /** Shows a single account summary, recent transactions, and a mini trend. */
  const { id } = useParams();
  const { accounts, transactions } = useApp();
  const account = accounts.find((a) => a.id === id);

  const recent = useMemo(() => recentTransactionsForAccount(id, 12), [id, transactions]);

  const trend = useMemo(() => {
    // create a mini spark-like data set (sum last 12 txns cumulative)
    const vals = recent.slice().reverse().map((t, i) => (i === 0 ? account?.balance || 0 : 0));
    return recent.slice().reverse().map((t, i) => {
      return {
        x: i,
        y: Math.max(0, (account?.balance || 0) + recent.slice(i).reduce((s, tt) => s - tt.amount, 0)),
      };
    });
  }, [recent, account]);

  if (!account) return <div>Account not found</div>;

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#6B7280', fontSize: 12 }}>{account.type}</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{account.name} <span className="badge">{account.numberMasked}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#6B7280', fontSize: 12 }}>Current Balance</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>
              {account.balance.toLocaleString('en-US', { style: 'currency', currency: account.currency || 'USD' })}
            </div>
          </div>
        </div>
        {/* tiny trend */}
        <div style={{ marginTop: 10 }}>
          <svg width="100%" height="60" viewBox="0 0 200 60" aria-label="Balance trend">
            <polyline
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              points={trend.map((p, i) => `${(i / Math.max(1, trend.length - 1)) * 200},${60 - (p.y % 60)}`).join(' ')}
            />
          </svg>
        </div>
      </div>

      <Panel title="Recent Transactions" right={<Link to="/transactions" className="btn">View all</Link>}>
        <Table
          keyField="id"
          columns={[
            { key: 'date', header: 'Date', render: (v) => new Date(v).toLocaleDateString() },
            { key: 'description', header: 'Description' },
            { key: 'category', header: 'Category' },
            { key: 'amount', header: 'Amount', render: (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
          ]}
          data={recent}
        />
      </Panel>
    </div>
  );
}
