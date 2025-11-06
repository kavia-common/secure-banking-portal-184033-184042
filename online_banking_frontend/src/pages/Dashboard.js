import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Panel, StatCard, MiniBarChart } from '../components/ui';
import { computeMonthlySpend } from '../data/sampleData';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard shows account summaries and monthly spend chart. */
  const { accounts, transactions, loading } = useApp();

  const totals = useMemo(() => {
    const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
    const debitToday = transactions
      .filter((t) => new Date(t.date).toDateString() === new Date().toDateString() && t.amount < 0)
      .reduce((s, t) => s + Math.abs(t.amount), 0);
    const creditsThisMonth = transactions
      .filter((t) => {
        const d = new Date(t.date);
        const n = new Date();
        return t.amount > 0 && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
      })
      .reduce((s, t) => s + t.amount, 0);
    return {
      totalBalance: totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      debitToday: debitToday.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      creditsThisMonth: creditsThisMonth.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    };
  }, [accounts, transactions]);

  const monthly = useMemo(() => computeMonthlySpend(transactions, 6), [transactions]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="grid cols-3">
        <StatCard title="Total Balance" value={totals.totalBalance} hint="Across all accounts" />
        <StatCard title="Debits Today" value={totals.debitToday} hint="Spending so far" accent="amber" />
        <StatCard title="Credits This Month" value={totals.creditsThisMonth} hint="Income & refunds" />
      </div>

      <Panel title="Monthly Spending (last 6 months)">
        <MiniBarChart data={monthly} />
      </Panel>
    </div>
  );
}
