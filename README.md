# Currency Exchange Rates

A React application that displays exchange rates for a selected currency against other currencies over the last seven days.

## 🔗 Live Demo

**[https://kmavr-currency-rates.pages.dev/](https://kmavr-currency-rates.pages.dev/)**

## ✨ Features

- **Historical Data**: View exchange rates for the last 7 days from any selected date
- **Date Selection**: Choose any date up to 90 days in the past
- **Base Currency**: Change the base currency for comparison (default: GBP)
- **Multi-Currency Comparison**: Add/remove currencies from the table
  - Minimum: 3 currencies
  - Maximum: 7 currencies
  - Default currencies: USD, EUR, JPY, CHF, CAD, AUD, ZAR
- **Sorting**: Sort currency rates by name or value
- **Error Handling**: User-friendly error notifications with auto-dismiss
- **Responsive Design**: Mobile-friendly interface using Material-UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Technology Stack

### Core

- **React 19** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### State Management

- **Zustand** - Lightweight state management solution

### UI/Styling

- **Material-UI (MUI)** - React component library with built-in styling

### Code Quality

- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit validation
- **lint-staged** - Run linters on staged files

### Testing

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm test            # Run all tests
```

## 🧪 Testing

The project includes comprehensive test coverage with **72 tests** across **11 test files**:

- **Component Tests**: All UI components with user interactions
- **Hook Tests**: Custom hooks like `useCurrencySort`
- **Store Tests**: Zustand store state management
- **API Tests**: Service layer and API client
- **Utility Tests**: Date utilities and formatters

```bash
# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CurrencyRates/   # Main currency table
│   ├── CurrencySelection/
│   ├── DateSelection/
│   ├── ErrorAlert/      # Error notification
│   └── MultiCurrencySelector/
├── services/            # API services
│   └── api/
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── model/               # Constants and models
```

## 🌐 API

Currency data is fetched from the [Currency API](https://github.com/fawazahmed0/currency-api):

- **Available currencies**:

  ```
  https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json
  ```

- **Exchange rates for a specific date**:
  ```
  https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{yyyy-MM-dd}/v1/currencies/{currency-code}.json
  ```

## 🔧 Development Setup

This project uses several tools to maintain code quality:

### Git Hooks (Husky)

Pre-commit hooks automatically run:

- ESLint to check for code issues
- Prettier to format code

### Code Quality Standards

- **TypeScript strict mode** for type safety
- **ESLint rules** for React, TypeScript, and Hooks
- **Prettier** for consistent code formatting
- **DRY, KISS, SOLID principles** applied throughout

## 📦 Deployment

The application is deployed on **Cloudflare Pages**.

- **Build command**: `npm run build`
- **Output directory**: `dist`

## 📄 License

This project was created as part of a recruitment task for [EPS LT](https://eps.lt/en/).
