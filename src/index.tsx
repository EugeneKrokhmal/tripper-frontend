import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// @ts-ignore
import { Provider } from 'react-redux'; // Import Provider
import { store } from './redux/store';  // Import the store
import { I18nextProvider } from 'react-i18next';
import { CurrencyProvider } from './context/CurrencyContext';
import { DarkModeProvider } from './context/DarkModeContext';

import i18n from '../src/i18n'; // Import i18next configuration

import './index.css';

// import reportWebVitals from './reportWebVitals';

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

// reportWebVitals();
