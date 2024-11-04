import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const Price: React.FC<{ price: number }> = ({ price }) => {
    const { convertPrice } = useCurrency();

    return (
        <>
            {convertPrice(price)}
        </>
    );
};

export default Price;
