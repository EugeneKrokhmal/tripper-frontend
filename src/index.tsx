import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// @ts-ignore
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { I18nextProvider } from 'react-i18next';
import { CurrencyProvider } from './context/CurrencyContext';
import { DarkModeProvider } from './context/DarkModeContext';
import i18n from '../src/i18n';
import './index.css';

// Re-exporting types
export * from './types/User';
export * from './types/Location';
export * from './types/Expense';
export * from './types/Settlement';
export * from './types/Trip';

// Re-exporting props
export * from './props/TripProps';
export * from './props/SettlementProps';
export * from './props/ExpenseProps';
export * from './props/TripManagementProps';
export * from './props/MiscProps';
export * from './props/UsersTableProps';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <CurrencyProvider>
            <DarkModeProvider>
              <App />
            </DarkModeProvider>
          </CurrencyProvider>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
}
