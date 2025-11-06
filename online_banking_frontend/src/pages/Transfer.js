import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Panel, Input, Select } from '../components/ui';

// PUBLIC_INTERFACE
export default function Transfer() {
  /** Simulates a funds transfer and updates mock balances/transactions. */
  const { accounts, performTransfer } = useApp();
  const [from, setFrom] = useState(accounts[0]?.id || '');
  const [to, setTo] = useState(accounts[1]?.id || '');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const options = useMemo(() => accounts.map((a) => ({
    id: a.id,
    label: `${a.name} (${a.numberMasked})`,
    balance: a.balance,
  })), [accounts]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!from || !to || from === to) {
      setStatus({ type: 'error', message: 'Please select two different accounts.' });
      return;
    }
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      setStatus({ type: 'error', message: 'Enter a valid transfer amount.' });
      return;
    }
    const fromAcc = accounts.find((a) => a.id === from);
    if (fromAcc && fromAcc.balance < amt) {
      setStatus({ type: 'error', message: 'Insufficient funds in source account.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await performTransfer({ fromAccountId: from, toAccountId: to, amount: amt, memo });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Transfer successful.' });
        setAmount('');
        setMemo('');
      } else {
        setStatus({ type: 'error', message: 'Transfer failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Transfer failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Panel title="Transfer Funds">
        <form onSubmit={onSubmit} className="grid cols-2">
          <Select label="From Account" value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Select</option>
            {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </Select>
          <Select label="To Account" value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Select</option>
            {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </Select>
          <Input label="Amount (USD)" type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input label="Memo (optional)" value={memo} onChange={(e) => setMemo(e.target.value)} />
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
            <button className="btn primary" type="submit" disabled={submitting}>{submitting ? 'Transferring...' : 'Submit'}</button>
            <button className="btn" type="button" onClick={() => { setAmount(''); setMemo(''); }}>Clear</button>
          </div>
        </form>
        {status.message && (
          <div style={{
            marginTop: 12,
            padding: '10px 12px',
            borderRadius: 10,
            border: `1px solid ${status.type === 'success' ? '#34D399' : '#FCA5A5'}`,
            background: status.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
            color: status.type === 'success' ? '#065F46' : '#7F1D1D',
          }}>
            {status.message}
          </div>
        )}
      </Panel>

      <Panel title="Tip">
        Transfers here are simulated in-memory to demonstrate the flow. Connect a backend later and set REACT_APP_API_BASE.
      </Panel>
    </div>
  );
}
