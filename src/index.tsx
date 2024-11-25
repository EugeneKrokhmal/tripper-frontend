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
