import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAccounts, fetchTransactions, submitTransfer } from '../services/mockService';

const AppContext = createContext(undefined);

// PUBLIC_INTERFACE
export function useApp() {
  /** Hook to access application state and actions. */
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  /** Provides accounts and transactions state with mock services. */
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const [accs, txns] = await Promise.all([fetchAccounts(), fetchTransactions()]);
        if (!mounted) return;
        setAccounts(accs);
        setTransactions(txns);
      } catch (e) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    init();
    return () => { mounted = false; };
  }, []);

  const performTransfer = async ({ fromAccountId, toAccountId, amount, memo }) => {
    const res = await submitTransfer({ fromAccountId, toAccountId, amount, memo });
    if (res.ok) {
      // refresh from mock source to keep consistency
      const [accs, txns] = await Promise.all([fetchAccounts(), fetchTransactions()]);
      setAccounts(accs);
      setTransactions(txns);
    }
    return res;
  };

  const value = useMemo(() => ({
    loading,
    error,
    accounts,
    transactions,
    refresh: async () => {
      setLoading(true);
      const [accs, txns] = await Promise.all([fetchAccounts(), fetchTransactions()]);
      setAccounts(accs);
      setTransactions(txns);
      setLoading(false);
    },
    performTransfer,
  }), [loading, error, accounts, transactions]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
