import { sampleAccounts, sampleTransactions, applyTransfer } from '../data/sampleData';

// PUBLIC_INTERFACE
export async function fetchAccounts() {
  /** Mock: returns all accounts */
  await delay(200);
  return JSON.parse(JSON.stringify(sampleAccounts));
}

// PUBLIC_INTERFACE
export async function fetchAccountById(id) {
  /** Mock: returns a single account by id */
  await delay(180);
  return sampleAccounts.find((a) => a.id === id) || null;
}

// PUBLIC_INTERFACE
export async function fetchTransactions({ accountId } = {}) {
  /** Mock: returns all or account-specific transactions */
  await delay(260);
  const txns = accountId ? sampleTransactions.filter((t) => t.accountId === accountId) : sampleTransactions;
  return txns
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// PUBLIC_INTERFACE
export async function submitTransfer(payload) {
  /** Mock: applies a transfer and returns a success result */
  await delay(400);
  const result = applyTransfer(payload);
  return { ok: true, ...result };
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
