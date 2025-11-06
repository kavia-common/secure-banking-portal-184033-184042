import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import AccountDetail from './pages/AccountDetail';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * App entrypoint: Sets up routing, app context, and main layout.
 * Routes:
 *  - GET / : Dashboard summary with monthly spending chart
 *  - GET /accounts : Accounts list with balances and links
 *  - GET /accounts/:id : Account detail with recent transactions
 *  - GET /transactions : Transactions table with client-side filters
 *  - GET /transfer : Transfer funds mock flow
 */
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/:id" element={<AccountDetail />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
