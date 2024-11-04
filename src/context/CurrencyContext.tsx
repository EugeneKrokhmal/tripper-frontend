import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextProps {
    currency: string;
    setCurrency: (currency: string) => void;
    convertPrice: (price: number) => string;
    convertAmount: (amount: number) => number;
}

interface CurrencyProviderProps {
    children: React.ReactNode;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    // Load initial currency from localStorage or default to USD
    const [currency, setCurrency] = useState<string>(() => localStorage.getItem('currency') || '$');
    const [rates, setRates] = useState<{ [key: string]: number }>({
        "$": 1,
        "€": 1,
        "₴": 1,
        "zł": 1
    });

    const convertAmount = (amount: number): number => {
        const rate = rates[currency];
        if (!rate) {
            console.warn(`Conversion rate for currency ${currency} not found.`);
            return amount;  // Return the amount as is if no rate is found
        }
        // Convert from USD to the selected currency
        return amount / rate;
    };

    const convertPrice = (price: number): string => {
        const rate = rates[currency] || rates['$'];
        return (price * rate) + currency;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, convertAmount }}>
            {children}
        </CurrencyContext.Provider>
    );
};

// Custom hook to use the currency context
export const useCurrency = (): CurrencyContextProps => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
