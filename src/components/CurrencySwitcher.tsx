import React from 'react';
import { useCurrency } from './CurrencyContext';

const CurrencySwitcher: React.FC = () => {
    const { currency, setCurrency } = useCurrency();

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <div className="currency-switcher">
            <select id="currency-select" className="block dark:bg-gray-900 w-full text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={currency} onChange={handleCurrencyChange}>
                <option value="$">USD</option>
                <option value="€">EUR</option>
                <option value="zł">PLN</option>
                <option value="₴">UAH</option>
            </select>
        </div>
    );
};

export default CurrencySwitcher;
