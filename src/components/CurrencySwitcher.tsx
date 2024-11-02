import React from 'react';
import { useCurrency } from './CurrencyContext';
import SelectField from './elements/SelectField';
import { useTranslation } from 'react-i18next';

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
