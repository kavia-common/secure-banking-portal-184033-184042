# Online Banking Frontend (Mock Mode)

A lightweight React-based mock online banking frontend that showcases key flows without a backend. It follows the "Ocean Professional" theme and runs fully in the browser using seeded mock data.

## What’s Included

- Dashboard with account summary cards and a monthly spending bar chart (SVG)
- Side navigation to Dashboard, Accounts, Transactions, Transfers
- Accounts list and account detail (with recent transactions and mini trend)
- Transactions table with client-side filters (type and date range)
- Transfers flow with validation, in-memory updates, and confirmation message
- Ocean Professional theme (blue and amber accent) using CSS and a theme file
- Mock service layer that defaults on when no API base is configured

## Getting Started

Install dependencies and start dev server:

```bash
npm install
npm start
```

Open http://localhost:3000 to view.

## Mock Mode vs. Real API

- By default (when `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL` is empty), the app runs in mock mode and reads from in-memory data.
- To point to a real backend later, set one of the following in your `.env`:
  - `REACT_APP_API_BASE=https://your-backend.example.com` (preferred)
  - or `REACT_APP_BACKEND_URL=https://your-backend.example.com`

If an API base is provided, you can replace the functions in `src/services/mockService.js` with real fetch calls or add a new `apiService.js` and switch imports accordingly.

See `.env.example` for a full list of keys.

## Routes

- `/` Dashboard
- `/accounts` Accounts list
- `/accounts/:id` Account details with recent transactions
- `/transactions` Transactions with filters
- `/transfer` Transfer funds (mock)

## Theming

Theme values are defined in:
- `src/theme.js` (colors, radii, shadows)
- `src/components/layout.css` (layout and components)
- `src/App.css` (global variables and base styles)
