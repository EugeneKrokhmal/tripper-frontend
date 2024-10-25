import React from 'react';
import { useCurrency } from './CurrencyContext';

const Price: React.FC<{ price: number }> = ({ price }) => {
    const { convertPrice } = useCurrency();

    return (
        <>
            {convertPrice(price)}
        </>
    );
};

export default Price;
