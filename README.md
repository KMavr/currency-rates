# Currency Exchange Rates

A React application that displays exchange rates for a selected currency against other currencies over the last seven days.

## Features

- View exchange rates for the last 7 days from a selected date
- Default base currency: GBP
- Compare against 7 currencies: USD, EUR, JPY, CHF, CAD, AUD, ZAR
- Date selection (up to 90 days in the past)
- Add/remove currencies from comparison (min 3, max 7)
- Change base currency

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## Installation

```bash
npm install
```

## Available Scripts

### `npm run dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run lint`

Runs ESLint to check for code issues.

### `npm run preview`

Previews the production build locally.

## Development Setup

This project uses:
- **Husky** for Git hooks
- **lint-staged** to run ESLint and Prettier on staged files before commit
- ESLint configuration with React, TypeScript, and Prettier integration

## API

Currency data is fetched from:
- Available currencies: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
- Exchange rates: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{yyyy-MM-dd}/v1/currencies/{currency-code}.json`

## Requirements

- Node.js 18+
- npm 9+
