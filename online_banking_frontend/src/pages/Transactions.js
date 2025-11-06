import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Panel, Table, Select, Input } from '../components/ui';

// PUBLIC_INTERFACE
export default function Transactions() {
  /** Transactions list with client-side filtering by type and date range. */
  const { transactions } = useApp();
  const [type, setType] = useState('all');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (type !== 'all') {
        const isCredit = t.amount > 0;
        if (type === 'credit' && !isCredit) return false;
        if (type === 'debit' && isCredit) return false;
      }
      const date = new Date(t.date);
      if (start && date < new Date(start)) return false;
      if (end && date > new Date(end)) return false;
      return true;
    });
  }, [transactions, type, start, end]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Panel
        title="Filters"
        right={<span className="badge">{filtered.length} results</span>}
      >
        <div className="grid cols-3">
          <Select label="Type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All</option>
            <option value="debit">Debits</option>
            <option value="credit">Credits</option>
          </Select>
          <Input label="Start Date" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <Input label="End Date" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </Panel>

      <Table
        keyField="id"
        columns={[
          { key: 'date', header: 'Date', render: (v) => new Date(v).toLocaleDateString() },
          { key: 'accountId', header: 'Account' },
          { key: 'description', header: 'Description' },
          { key: 'category', header: 'Category' },
          { key: 'amount', header: 'Amount', render: (v) => (
            <span style={{ color: v < 0 ? '#DC2626' : '#047857', fontWeight: 600 }}>
              {v.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </span>
          ) },
        ]}
        data={filtered}
      />
    </div>
  );
}
