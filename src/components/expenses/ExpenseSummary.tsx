import React from 'react';
import { useTranslation } from 'react-i18next';
import Price from '../Price';

interface ExpenseSummaryProps {
    totalPaidByUser: number;
    totalCost: number;
    fairShare: number;
    onFairShareUpdate: (fairShare: number, settlements: any[]) => void;
    tripId: string;
    remainingOwedToUser: number;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ totalPaidByUser, totalCost, remainingOwedToUser }) => {
    const { t } = useTranslation();
    const userCost = totalPaidByUser - remainingOwedToUser

    if (totalCost <= 0) {
        return '';
    }

    return (
        <div className="mb-6 md:max-w-sm w-full bg-white dark:bg-zinc-800">
            <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl">
                <span className="text-gradient">
                    {t('expensesOverview')}
                </span>
            </h3>

            <div className="max-w-sm w-full bg-white dark:bg-zinc-800">
                <div className="flex justify-between border-zinc-200 border-b dark:border-zinc-700 pb-3">
                    <dl>
                        <dt className="text-base font-normal text-zinc-500 dark:text-zinc-400 pb-1">{t('totalTripCost')}</dt>
                        <dd className="leading-none text-3xl font-bold text-zinc-900 dark:text-white"><Price price={+totalCost.toFixed()} /></dd>
                    </dl>
                    <div>
                    </div>
                </div>

                <div className="grid grid-cols-2 py-3">
                    <dl>
                        <dt className="text-base font-normal text-zinc-500 dark:text-zinc-400 pb-1">{t('othersOwe')}</dt>
                        <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400"><Price price={+remainingOwedToUser.toFixed(2)} /></dd>
                    </dl>
                    <dl>
                        <dt className="text-base font-normal text-zinc-500 dark:text-zinc-400 pb-1">{t('itCostsYou')}</dt>
                        <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500"><Price price={+userCost.toFixed(2)} /></dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSummary;
