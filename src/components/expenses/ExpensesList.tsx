import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteExpense } from '../../services/expensesService';
import Modal from '../elements/Modal';
import Button from '../elements/Button';
import ExpenseForm from './ExpenseForm';
import { useTranslation } from 'react-i18next';
import Price from '../Price';

interface Expense {
    _id: string;
    expenseName: string;
    expenseDescription: string;
    amount: number;
    responsibleUserId: string;
    date: string;
    splitParticipants: string[];
}

interface Participant {
    _id: string;
    name: string;
    profilePicture?: string;
}

interface ExpensesListProps {
    userId: string;
    expenses: Expense[];
    participants: Participant[];
    tripId: string;
    token: string;
    onExpenseDeleted: (updatedExpenses: Expense[]) => void;
    onExpenseAdded: (newExpense: Expense) => void;
    onEditExpense: (expenseId: string) => void;
}

const ExpensesList: React.FC<ExpensesListProps> = ({
    userId,
    expenses,
    participants,
    tripId,
    token,
    onExpenseDeleted,
    onExpenseAdded,
    onEditExpense,
}) => {
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [expenseList, setExpenseList] = useState<Expense[]>(expenses);
    const [showAll, setShowAll] = useState<boolean>(false);
    const navigate = useNavigate();
    const getParticipantById = (id: string) => participants.find(p => p._id === id);

    const handleDeleteExpense = async (expenseId: string) => {
        try {
            await deleteExpense(tripId, expenseId, token);
            const updatedExpenses = expenseList.filter(expense => expense._id !== expenseId);
            setExpenseList(updatedExpenses);
            onExpenseDeleted(updatedExpenses);
        } catch (error) {
            console.error(t('deleteExpenseError'), error);
        }
    };

    const handleEditExpense = (expenseId: string) => {
        navigate(`/trips/${tripId}/expenses/${expenseId}/edit`);
    };

    const handleAddExpense = (newExpense: Expense) => {
        const updatedExpenses = [...expenseList, newExpense];
        setExpenseList(updatedExpenses);
        onExpenseAdded(newExpense);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
        }).format(date);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const displayedExpenses = showAll ? expenseList : expenseList.slice(-3);

    return (
        <div className="my-4">
            {expenseList.length > 0 && (
                <>
                    <h3 id="history" className="mb-2 text-4xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            {t('history')}
                        </span>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
                        {t('expensesLog')}
                    </p>
                </>
            )}
            <ol className="relative border-s border-gray-200 dark:border-gray-700 my-6">
                {displayedExpenses.map((expense) => {
                    const responsiblePerson = getParticipantById(expense.responsibleUserId);
                    const splitters = expense.splitParticipants.map(id => getParticipantById(id));

                    return (
                        <li key={expense.date} className="mb-8 ms-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <div className="flex justify-between items-bottom mb-2 pb-2">
                                <div>
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-300">
                                        {formatDate(expense.date)}
                                    </time>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {expense.expenseName}
                                    </h3>
                                    <p className="text-base font-normal text-gray-500 dark:text-gray-300 dark:text-gray-400">
                                        {t('amount')}: <Price price={+expense.amount.toFixed(2)} />
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-300 mb-2 text-right">
                                            {t('involved')}
                                        </p>
                                        <ul className="flex -space-x-4 rtl:space-x-reverse justify-end">
                                            {splitters.slice(0, 3).map((splitter) => (
                                                splitter && (
                                                    <li key={splitter?._id} className="flex items-center space-x-2 rounded-full">
                                                        {splitter?.profilePicture ? (
                                                            <img
                                                                key={splitter?._id}
                                                                className="w-10 h-10 rounded-full"
                                                                src={`https://ui-avatars.com/api/?name=${splitter?.name}&background=random`}
                                                                alt={splitter?.name}
                                                            />
                                                        ) : (
                                                            <img
                                                                key={splitter?._id}
                                                                className="w-10 h-10 rounded-full"
                                                                src={`https://ui-avatars.com/api/?name=${splitter?.name}&background=random`}
                                                                alt={splitter?.name}
                                                            />
                                                        )}
                                                    </li>
                                                )
                                            ))}
                                            {splitters.length > 3 && (
                                                <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full hover:bg-gray-600">
                                                    +{splitters.length - 3}
                                                </span>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <p className="my-2 text-xs font-normal text-gray-900 dark:text-gray-400">
                                {expense.expenseDescription}
                            </p>

                            <div className="flex justify-between align-end w-full gap-4 pb-4 border-b-2">
                                <div className="self-end">
                                    <p className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                                        {t('responsible')}:
                                    </p>
                                    <div className="flex">

                                        <img
                                            key={responsiblePerson?._id}
                                            className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800 mr-2"
                                            src={`https://ui-avatars.com/api/?name=${responsiblePerson?.name}&background=random`}
                                            alt={responsiblePerson?.name}
                                        />
                                        <p className="text-xs flex items-center space-x-2 dark:text-gray-400">
                                            {responsiblePerson?.name || 'Unknown'}
                                        </p>
                                    </div>
                                </div>

                                <img src={``} alt="" />

                                {userId === expense.responsibleUserId && (
                                    <>
                                        <div className="flex gap-2 self-end">
                                            <a
                                                onClick={() => handleEditExpense(expense._id)}
                                                className="cursor-pointer text-xs dark:text-gray-300 hover:underline my-2"
                                            >
                                                {t('edit')}
                                            </a>
                                            <a
                                                onClick={() => handleDeleteExpense(expense._id)}
                                                className="cursor-pointer text-xs text-red-600 dark:text-red-400 hover:underline my-2"
                                            >
                                                {t('delete')}
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>

            <div className="flex gap-2">
                <div className="self-start">
                    <Button label={t('addExpense')} onClick={() => setModalVisible(true)} variant="primary" />
                </div>
                {expenseList.length > 3 && (
                    <div className="self-start">
                        <Button
                            label={showAll ? t('showLess') : t('showMore')}
                            onClick={() => setShowAll(!showAll)}
                            variant="secondary"
                        />
                    </div>
                )}

            </div>
            {modalVisible && (
                <Modal onClose={closeModal}>
                    <ExpenseForm
                        userId={userId}
                        participants={participants}
                        tripId={tripId}
                        token={token}
                        onExpenseAdded={(newExpense) => {
                            handleAddExpense(newExpense);
                            closeModal();
                        }}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ExpensesList;