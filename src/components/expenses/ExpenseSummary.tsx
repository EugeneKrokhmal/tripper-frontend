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
            <h3 className="mb-4 text-4xl md:text-3xl font-extrabold text-zinc-900 dark:text-white">
                <span className="text-gradient">{t('expensesOverview')}</span>
            </h3>
            <div className="mb-2 bg-zinc-100 dark:bg-zinc-600 rounded p-2 flex justify-between items-end gap-2">
                <h5 className="text-4xl font-bold text-zinc-900 dark:text-white">
                    <Price price={+totalCost.toFixed()} />
                </h5>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-300 pb-1">{t('totalTripCost')}</p>
            </div>
            <div className="flex gap-2 items-normal mb-4">
                <div className="bg-red-100 dark:bg-red-900 rounded p-2 w-full">
                    <h5 className="text-l font-bold text-zinc-900 dark:text-white">
                        <Price price={+userCost.toFixed(2)} />
                    </h5>
                    <p className="text-xs font-normal text-zinc-500 dark:text-zinc-300 ">{t('itCostsYou')}</p>
                </div>
                {+remainingOwedToUser > 0 && (
                    <div className="bg-green-100 dark:bg-green-900 rounded p-2 w-full">
                        <h5 className="text-l font-bold text-zinc-900 dark:text-white">
                            <Price price={+remainingOwedToUser.toFixed(2)} />
                        </h5>
                        <p className="text-xs font-normal text-zinc-500 dark:text-zinc-300 ">{t('othersOwe')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseSummary;
