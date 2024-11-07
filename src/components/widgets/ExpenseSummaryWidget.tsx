import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Price from '../Price';
import Button from '../elements/Button';
import UsersTable from '../users/UsersTable';

interface ExpenseSummaryWidgetProps {
    totalPaidByUser: number;
    totalCost: number;
    fairShare: number;
    onFairShareUpdate: (fairShare: number, settlements: any[]) => void;
    tripId: string;
    onAddExpenseClick: () => void;
    remainingOwedToUser: number;
    isOwner: boolean;
    participants: { _id: string; name: string }[];
    expenses: {
        _id: string;
        expenseName: string;
        amount: number;
        responsibleUserId: string;
        splitParticipants: string[];
    }[];
}

const ExpenseSummaryWidget: React.FC<ExpenseSummaryWidgetProps> = ({ totalPaidByUser, totalCost, remainingOwedToUser, onAddExpenseClick, isOwner, participants, expenses }) => {
    const { t } = useTranslation();
    const userCost = totalPaidByUser - remainingOwedToUser;
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const [touchStartY, setTouchStartY] = useState<number>(0);

    const toggleWidget = () => setIsWidgetOpen(!isWidgetOpen);

    const handleTouchStart = (e: React.TouchEvent) => {
        // Get the starting Y position of the touch
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        // Get the ending Y position of the touch
        const touchEndY = e.changedTouches[0].clientY;

        // Determine if the swipe was downward
        if (touchEndY - touchStartY > 50) {
            setIsWidgetOpen(false); // Close the widget on swipe down
        }
    };

    if (totalCost <= 0) {
        return '';
    }

    return (
        <div className={`md:hidden bottom-4 left-4 right-4 z-10 fixed`}>
            <div className={`${!isWidgetOpen ? 'h-12 rounded-t-3xl rounded-b-3xl' : 'h-96 rounded-t-3xl rounded-b-3xl'} transition-all overflow-hidden items-center justify-between bg-gray-200 dark:bg-zinc-900 shadow p-1 relative`}>
                <div className="flex justify-between">
                    <div className="self-start">
                        <Button label={t('addExpense')} onClick={onAddExpenseClick} variant="primary" />
                    </div>
                    {!isWidgetOpen ? (
                        <div
                            onClick={toggleWidget}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            className={`duration-1000 flex gap-1 text-right items-center pr-4`}>
                            <dl>
                                <dd className="leading-none text-sm font-bold text-zinc-900 dark:text-white">&#8704;<Price price={+totalCost.toFixed()} /></dd>
                            </dl>
                            <dl>
                                <dd className="leading-none text-sm font-bold text-green-500 dark:text-green-400">&#x2193;<Price price={+remainingOwedToUser.toFixed(2)} /></dd>
                            </dl>
                            <dl>
                                <dd className="leading-none text-sm font-bold text-red-600 dark:text-red-500">&#x2191;<Price price={+userCost.toFixed(2)} /></dd>
                            </dl>
                        </div>
                    ) : (
                        <button
                            className="mr-2 text-zinc-500 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-white"
                            onClick={() => {
                                toggleWidget()
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className={`mt-2 flex flex-col`}>
                    <div className="rounded overflow-scroll h-64">
                        <UsersTable isOwner={isOwner} participants={participants} expenses={expenses} />
                    </div>
                    <div
                        className="flex gap-2 text-left p-2 my-4">
                        <dl>
                            <dd className="leading-none mb-1 font-bold text-zinc-900 dark:text-white">&#8704;<Price price={+totalCost.toFixed()} /></dd>
                            <dt className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{t('totalTripCost')}</dt>
                        </dl>
                        <dl>
                            <dd className="leading-none mb-1 font-bold text-green-500 dark:text-green-400">&#x2193;<Price price={+remainingOwedToUser.toFixed(2)} /></dd>
                            <dt className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{t('othersOwe')}</dt>
                        </dl>
                        <dl>
                            <dd className="leading-none mb-1 font-bold text-red-600 dark:text-red-500">&#x2191;<Price price={+userCost.toFixed(2)} /></dd>
                            <dt className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{t('itCostsYou')}</dt>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSummaryWidget;
