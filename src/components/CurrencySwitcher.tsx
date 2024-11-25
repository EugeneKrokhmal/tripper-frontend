import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';

import SelectField from './elements/SelectField';

const CurrencySwitcher: React.FC = () => {
    const { t } = useTranslation();
    const { currency, setCurrency } = useCurrency();

    return (
            <SelectField
                label={t('Currency')}
                value={currency}
                onChange={(value) => setCurrency(value)}
                options={[
                    { value: '$', label: t('USD') },
                    { value: '€', label: t('EUR') },
                    { value: 'zł', label: t('PLN') },
                    { value: '₴', label: t('UAH') },
                ]}
            />
    );
};

export default CurrencySwitcher;
