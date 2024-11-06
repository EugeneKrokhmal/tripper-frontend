import React from 'react';
import { useTranslation } from 'react-i18next';
import Price from '../Price';

interface ExpenseSummaryWidgetProps {
    totalPaidByUser: number;
    totalCost: number;
    fairShare: number;
    onFairShareUpdate: (fairShare: number, settlements: any[]) => void;
    tripId: string;
    remainingOwedToUser: number;
}

const ExpenseSummaryWidget: React.FC<ExpenseSummaryWidgetProps> = ({ totalPaidByUser, totalCost, remainingOwedToUser }) => {
    const { t } = useTranslation();
    const userCost = totalPaidByUser - remainingOwedToUser

    if (totalCost <= 0) {
        return '';
    }

    return (
        <div className="z-10 fixed top-16 left-0 right-0 mb-6 bg-white dark:bg-zinc-800 pt-4">
            <div className="w-full bg-white dark:bg-zinc-800 shadow">
                <div className="grid grid-cols-3 items center pt-2 px-4 text-center h-12">
                    <dl>
                        <dt className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{t('totalTripCost')}</dt>
                        <dd className="leading-none text-sm font-bold text-zinc-900 dark:text-white"><Price price={+totalCost.toFixed()} /></dd>
                    </dl>
                    <dl>
                        <dt className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{t('othersOwe')}</dt>
                        <dd className="leading-none text-sm font-bold text-green-500 dark:text-green-400"><Price price={+remainingOwedToUser.toFixed(2)} /></dd>
                    </dl>
                    <dl>
                        <dt className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{t('itCostsYou')}</dt>
                        <dd className="leading-none text-sm font-bold text-red-600 dark:text-red-500"><Price price={+userCost.toFixed(2)} /></dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSummaryWidget;
