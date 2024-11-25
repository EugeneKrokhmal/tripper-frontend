import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../elements/Modal';
import Button from '../elements/Button';
import ExpenseForm from './ExpenseForm';
import Price from '../Price';
import UserIcon from '../elements/UserIcon';
import InputField from '../elements/InputField';
import EditIcon from '../../images/icons/edit.svg';
import DeleteIcon from '../../images/icons/delete.svg';

import { formatDate } from '../../utils/dateUtils';
import { deleteExpense } from '../../services/expensesService';
import type { ExpensesListProps, Expense } from '../../index';

const ExpensesList: React.FC<ExpensesListProps> = ({
    userId,
    isOwner,
    expenses,
    participants,
    tripId,
    token,
    onExpenseDeleted,
    onExpenseAdded,
}) => {
    const { t } = useTranslation();
    const [expenseModalVisible, setExpenseModalVisible] = useState<boolean>(false);
    const [expensesListModalVisible, setExpensesListModalVisible] = useState<boolean>(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
    const [expenseList, setExpenseList] = useState<Expense[]>(expenses);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const getParticipantById = (id: string) => participants.find(p => p._id === id);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredExpenses = expenses.filter(
        (expense) =>
            expense.expenseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.expenseDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);
        setExpenseModalVisible(true);
    };

    const handleAddExpense = (newExpense: Expense) => {
        const updatedExpenses = [...expenseList, newExpense];
        setExpenseList(updatedExpenses);
        onExpenseAdded(newExpense);
    };

    const handleUpdateExpense = (updatedExpense: Expense) => {
        const updatedExpenses = expenseList.map(expense =>
            expense._id === updatedExpense._id ? updatedExpense : expense
        );
        setExpenseList(updatedExpenses);
        setEditingExpense(null);
    };

    const closeExpenseModal = () => {
        setExpenseModalVisible(false);
    };

    const handleDeleteExpenseClick = (expense: Expense) => {
        setExpenseToDelete(expense);
        setDeleteModalVisible(true);
    };

    const confirmDeleteExpense = async () => {
        if (!expenseToDelete) return;

        try {
            await deleteExpense(tripId, expenseToDelete._id, token);
            const updatedExpenses = expenseList.filter(expense => expense._id !== expenseToDelete._id);
            setExpenseList(updatedExpenses);
            onExpenseDeleted(updatedExpenses);
            setDeleteModalVisible(false);
            setExpenseToDelete(null);
        } catch (error) {
            console.error(t('deleteExpenseError'), error);
        }
    };

    const cancelDeleteExpense = () => {
        setDeleteModalVisible(false);
        setExpenseToDelete(null);
    };

    return (
        <>
            {expenseList.length > 0 && (
                <>
                    <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl">
                        <span className="text-gradient">
                            {t('history')}
                        </span>
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">
                        {t('expensesLog')}
                    </p>
                </>
            )}

            <ol className="z-0 relative border-s border-zinc-200 dark:border-zinc-700 dark:border-zinc-700">
                {expenses.slice(-3).map((expense) => {
                    const responsiblePerson = getParticipantById(expense.responsibleUserId);
                    const splitters = expense.splitParticipants.map(id => getParticipantById(id));

                    return (
                        <li key={expense.date} className="mb-8 ms-4">
                            <div className="absolute w-3 h-3 bg-zinc-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-zinc-900 dark:bg-zinc-700"></div>
                            <div className="flex justify-between items-bottom mb-2 pb-2">
                                <div>
                                    <time className="mb-1 text-sm font-normal leading-none text-zinc-400 dark:text-zinc-300">
                                        {expense.date ? formatDate(expense.date) : ''}
                                    </time>
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                        {expense.expenseName}
                                    </h3>
                                    <p className="text-base font-normal text-zinc-500 dark:text-zinc-300 dark:text-zinc-400">
                                        {t('amount')}: <Price price={+expense.amount.toFixed(2)} />
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-300 mb-2 text-right">
                                            {t('involved')}
                                        </p>
                                        <ul className="flex -space-x-3 rtl:space-x-reverse justify-end">
                                            {splitters.slice(0, 10).map((splitter) => (
                                                splitter && (
                                                    <li key={splitter?._id} className="flex items-center space-x-2 rounded-full">
                                                        <UserIcon
                                                            userName={splitter?.name || ''}
                                                            userId={splitter?._id || ''}
                                                            profilePhoto={splitter?.profilePhoto || ''}
                                                            size={'xs'}
                                                            key={splitter?._id}
                                                        />
                                                    </li>
                                                )
                                            ))}
                                            {splitters.length > 10 && (
                                                <span className="z-10 flex items-center justify-center w-6 min-w-6 h-6 md:w-8 md:h-8 md:min-w-8 text-xs font-medium text-white bg-zinc-700 rounded-full hover:bg-zinc-600">
                                                    +{splitters.length - 3}
                                                </span>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <p className="my-2 text-xs font-normal text-zinc-900 dark:text-zinc-400">
                                {expense.expenseDescription}
                            </p>

                            <div className="flex justify-between align-end w-full gap-4 pb-4 border-zinc-100 dark:border-zinc-700 border-b-2">
                                <div className="self-end">
                                    <p className="text-xs text-zinc-500 dark:text-zinc-300 mb-2">
                                        {t('responsible')}:
                                    </p>
                                    <div className="flex gap-2">
                                        <UserIcon
                                            userName={responsiblePerson?.name || ''}
                                            userId={responsiblePerson?._id || ''}
                                            profilePhoto={responsiblePerson?.profilePhoto || ''}
                                            size={'xs'}
                                            key={responsiblePerson?._id}
                                        />
                                        <p className="text-xs flex items-center space-x-2 dark:text-zinc-400">
                                            {responsiblePerson?.name || 'Unknown'}
                                        </p>
                                    </div>
                                </div>

                                {(userId === expense.responsibleUserId || isOwner) && (
                                    <>
                                        <div className="flex gap-2 self-end">
                                            <a
                                                onClick={() => handleEditExpense(expense)}
                                                className="cursor-pointer text-xs dark:text-zinc-300 hover:underline my-2"
                                            >
                                                <img src={EditIcon} alt={t('editActivity')} />

                                            </a>
                                            <a
                                                onClick={() => handleDeleteExpenseClick(expense)}
                                                className="cursor-pointer text-xs text-red-600 dark:text-red-400 hover:underline my-2"
                                            >
                                                <img src={DeleteIcon} alt={t('delete')} />
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>

            {expensesListModalVisible && (
                <Modal onClose={() => { setExpensesListModalVisible(false) }}>
                    <div className="pt-4">
                        <div className="px-2 pt-4 sticky z-10 bg-white dark:bg-zinc-800 top-0">
                            <InputField
                                value={searchQuery}
                                type="text"
                                label={t('search')}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="max-h-[70vh] min-h-[70vh] overflow-y-auto pl-2">
                        <ol className="pr-2 z-0 relative border-s border-zinc-200 dark:border-zinc-700">
                            {filteredExpenses.map((expense) => {
                                const responsiblePerson = getParticipantById(expense.responsibleUserId);
                                const splitters = expense.splitParticipants.map(id => getParticipantById(id));

                                return (
                                    <li key={expense.date} className="mb-8 ms-4 py-2 my-6 border-zinc-100 dark:border-zinc-600 border-b-2">
                                        <div className="absolute w-3 h-3 bg-zinc-200 rounded-full mt-1.5 -start-1.5 dark:bg-zinc-700"></div>
                                        <div className="flex justify-between items-bottom mb-2 pb-2">
                                            <div>
                                                <time className="mb-1 text-sm font-normal leading-none text-zinc-400 dark:text-zinc-300">
                                                    {expense.date ? formatDate(expense.date) : ''}
                                                </time>
                                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                                    {expense.expenseName}
                                                </h3>
                                                <p className="text-base font-normal text-zinc-500 dark:text-zinc-300 dark:text-zinc-400">
                                                    {t('amount')}: <Price price={+expense.amount.toFixed(2)} />
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-300 mb-2 text-right">
                                                        {t('involved')}
                                                    </p>
                                                    <ul className="flex -space-x-3 rtl:space-x-reverse justify-end">
                                                        {splitters.slice(0, 10).map((splitter) => (
                                                            splitter && (
                                                                <li key={splitter?._id} className="flex items-center space-x-2 rounded-full">
                                                                    <UserIcon
                                                                        userName={splitter?.name || ''}
                                                                        userId={splitter?._id || ''}
                                                                        profilePhoto={splitter?.profilePhoto || ''}
                                                                        size={'xs'}
                                                                        key={splitter?._id}
                                                                    />
                                                                </li>
                                                            )
                                                        ))}
                                                        {splitters.length > 10 && (
                                                            <span className="z-10 flex items-center justify-center w-6 min-w-6 h-6 md:w-8 md:h-8 md:min-w-8 text-xs font-medium text-white bg-zinc-700 rounded-full hover:bg-zinc-600">
                                                                +{splitters.length - 10}
                                                            </span>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="my-2 text-xs font-normal text-zinc-900 dark:text-zinc-400">
                                            {expense.expenseDescription}
                                        </p>

                                        <div className="flex justify-between align-end w-full gap-4 border-zinc-100 dark:border-zinc-700">
                                            <div className="self-end">
                                                <p className="text-xs text-zinc-500 dark:text-zinc-300 mb-2">
                                                    {t('responsible')}:
                                                </p>
                                                <div className="flex gap-2">
                                                    <UserIcon
                                                        userName={responsiblePerson?.name || ''}
                                                        userId={responsiblePerson?._id || ''}
                                                        profilePhoto={responsiblePerson?.profilePhoto || ''}
                                                        size={'xs'}
                                                        key={responsiblePerson?._id}
                                                    />
                                                    <p className="text-xs flex items-center space-x-2 dark:text-zinc-400">
                                                        {responsiblePerson?.name || 'Unknown'}
                                                    </p>
                                                </div>
                                            </div>

                                            {(userId === expense.responsibleUserId || isOwner) && (
                                                <>
                                                    <div className="flex gap-2 self-end">
                                                        <a
                                                            onClick={() => handleEditExpense(expense)}
                                                            className="cursor-pointer text-xs dark:text-zinc-300 hover:underline my-2"
                                                        >
                                                            <img src={EditIcon} alt={t('editActivity')} />
                                                        </a>
                                                        <a
                                                            onClick={() => handleDeleteExpenseClick(expense)}
                                                            className="cursor-pointer text-xs text-red-600 dark:text-red-400 hover:underline my-2"
                                                        >
                                                            <img src={DeleteIcon} alt={t('deleteActivity')} />
                                                        </a>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </Modal>
            )}

            <div className="flex gap-2">
                {expenseList.length > 3 && (
                    <div className="self-start">
                        <Button
                            label={expensesListModalVisible ? t('showLess') : t('showMore')}
                            onClick={() => setExpensesListModalVisible(true)}
                            variant="primary"
                        />
                    </div>
                )}

            </div>

            {expenseModalVisible && (
                <Modal onClose={closeExpenseModal}>
                    <ExpenseForm
                        isOwner={isOwner}
                        userId={userId}
                        participants={participants}
                        tripId={tripId}
                        token={token}
                        onExpenseAdded={(newExpense) => {
                            handleAddExpense(newExpense);
                            closeExpenseModal();
                        }}
                        onExpenseUpdated={(updatedExpense) => {
                            handleUpdateExpense(updatedExpense);
                            closeExpenseModal();
                        }}
                        expenseToEdit={editingExpense}
                    />
                </Modal>
            )}

            {deleteModalVisible && (
                <Modal onClose={cancelDeleteExpense}>
                    <div className="p-4">
                        <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                            <span className="text-gradient">
                                {t('confirmDelete')}
                            </span>
                        </h3>
                        <p className="text-sm mb-4">
                            {t('deleteExpenseConfirmation', { expenseName: expenseToDelete?.expenseName })}
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button label={t('cancel')} onClick={cancelDeleteExpense} variant="primary" />
                            <Button label={t('delete')} onClick={confirmDeleteExpense} variant="secondary" />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ExpensesList;