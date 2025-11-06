import { addMonths, endOfMonth, format, isWithinInterval, startOfMonth, subDays } from '../utils/dateUtils';

// Seed accounts
export const sampleAccounts = [
  {
    id: 'CHK-001',
    type: 'Checking',
    name: 'Everyday Checking',
    numberMasked: '•••• 1123',
    balance: 3450.21,
    currency: 'USD',
  },
  {
    id: 'SAV-002',
    type: 'Savings',
    name: 'High-Yield Savings',
    numberMasked: '•••• 5567',
    balance: 12890.55,
    currency: 'USD',
  },
  {
    id: 'CRD-003',
    type: 'Credit',
    name: 'Rewards Credit Card',
    numberMasked: '•••• 9988',
    balance: -452.33,
    creditLimit: 5000,
    currency: 'USD',
  },
];

// Generate sample transactions over last 120 days
const categories = ['Groceries', 'Dining', 'Utilities', 'Rent', 'Gas', 'Entertainment', 'Travel', 'Transfer', 'Salary'];
function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomAmount(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

const now = new Date();
export const sampleTransactions = [];
let txnId = 1000;

for (let i = 0; i < 220; i++) {
  const daysAgo = Math.floor(Math.random() * 120);
  const date = subDays(now, daysAgo);
  const category = randomFrom(categories);
  const isCredit = category === 'Salary' || (category === 'Transfer' && Math.random() > 0.5);
  const account = randomFrom(sampleAccounts);
  const amount = isCredit ? randomAmount(500, 3500) : randomAmount(5, 300);
  sampleTransactions.push({
    id: `TX-${txnId++}`,
    accountId: account.id,
    date: date.toISOString(),
    description: category === 'Salary' ? 'Payroll Deposit' : `${category} Purchase`,
    category,
    type: isCredit ? 'credit' : 'debit',
    amount: isCredit ? amount : -amount,
    balanceAfter: 0, // computed later if needed
  });
}

// Utility to compute monthly spend (absolute debits)
export function computeMonthlySpend(transactions, monthsBack = 6) {
  const series = [];
  let cursor = startOfMonth(addMonths(now, -monthsBack + 1));
  for (let i = 0; i < monthsBack; i++) {
    const start = startOfMonth(addMonths(cursor, i));
    const end = endOfMonth(start);
    const monthTxns = transactions.filter((t) =>
      isWithinInterval(new Date(t.date), { start, end }) && t.amount < 0
    );
    const total = monthTxns.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    series.push({
      label: format(start, 'MMM yyyy'),
      value: parseFloat(total.toFixed(2)),
    });
  }
  return series;
}

// Return last N transactions for an account
export function recentTransactionsForAccount(accountId, count = 10) {
  return sampleTransactions
    .filter((t) => t.accountId === accountId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}

// Create a new transfer transaction set in-memory
export function applyTransfer({ fromAccountId, toAccountId, amount, memo }) {
  const fromAcc = sampleAccounts.find((a) => a.id === fromAccountId);
  const toAcc = sampleAccounts.find((a) => a.id === toAccountId);
  const amt = Number(amount);
  const timestamp = new Date().toISOString();

  if (!fromAcc || !toAcc || isNaN(amt) || amt <= 0) {
    throw new Error('Invalid transfer request.');
  }
  if (fromAcc.balance < amt) {
    throw new Error('Insufficient funds.');
  }

  fromAcc.balance = parseFloat((fromAcc.balance - amt).toFixed(2));
  toAcc.balance = parseFloat((toAcc.balance + amt).toFixed(2));

  const debit = {
    id: `TX-${txnId++}`,
    accountId: fromAcc.id,
    date: timestamp,
    description: memo || `Transfer to ${toAcc.name}`,
    category: 'Transfer',
    type: 'debit',
    amount: -amt,
    balanceAfter: fromAcc.balance,
  };
  const credit = {
    id: `TX-${txnId++}`,
    accountId: toAcc.id,
    date: timestamp,
    description: memo || `Transfer from ${fromAcc.name}`,
    category: 'Transfer',
    type: 'credit',
    amount: amt,
    balanceAfter: toAcc.balance,
  };
  sampleTransactions.push(debit, credit);
  return { debit, credit, fromAcc, toAcc };
}
