import React from 'react';
import { useTranslation } from 'react-i18next';
import Price from '../Price';

interface UsersTableProps {
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

const UsersTable: React.FC<UsersTableProps> = ({
    isOwner,
    participants,
    expenses,
}) => {
    const { t } = useTranslation();

    // Helper function to get the list of expense names for which the user is responsible
    const getResponsibleExpensesNames = (userId: string) => {
        return expenses
            .filter((expense) => expense.responsibleUserId === userId)
            .map((expense) => expense.expenseName);
    };

    // Helper function to get the list of expenses the user is involved in (with amounts)
    const getInvolvedExpenses = (userId: string) => {
        return expenses
            .filter((expense) => expense.splitParticipants.includes(userId))
            .map((expense) => ({
                name: expense.expenseName,
                amount: (expense.amount / expense.splitParticipants.length), // Split amount among participants
            }));
    };

    return (
        <div className="flex flex-col">
            <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                <thead className="text-xs text-zinc-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-zinc-400">
                    <tr>
                        <th scope="col" className="px-2 py-3 text-xs">
                            {t('involved')}
                        </th>
                        <th scope="col" className="px-2 py-3 text-xs">
                            {t('responsible')}
                        </th>
                        <th scope="col" className="px-2 py-3 text-xs">
                            {t('expenses')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant) => (
                        <tr
                            key={participant._id}
                            className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700"
                        >
                            <td className="px-2 py-4 text-sm text-zinc-800 dark:text-zinc-200 items-center space-x-3">
                                <div className="flex gap-2 items-center">
                                    {participant ? (
                                        <img
                                            key={participant._id}
                                            className="w-10 h-10 border-2 border-white rounded-full dark:border-zinc-800"
                                            src={`https://ui-avatars.com/api/?name=${participant.name}&background=random`}
                                            alt={participant.name}
                                        />
                                    ) : (
                                        <div className="w-8 h-8 hidden md:flex rounded-full bg-gray-300 dark:bg-zinc-600 items-center justify-center">
                                            <span className="text-white text-sm font-medium">participant.name</span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold">{participant.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-2 py-4 text-xs align-top">
                                {/* Display the names of expenses the user is responsible for */}
                                <ul>
                                    {getResponsibleExpensesNames(participant._id).length > 0
                                        ? getResponsibleExpensesNames(participant._id).map((expenseName, index) => (
                                            <li key={index}>{expenseName}</li>
                                        ))
                                        : ''}
                                </ul>
                            </td>
                            <td className="px-2 py-4 text-xs align-top">
                                {/* Display the names and amounts of expenses the user is involved in */}
                                <ul className="leaders">
                                    {getInvolvedExpenses(participant._id).length > 0
                                        ? getInvolvedExpenses(participant._id).map((expense, index) => (
                                            <li key={index} className="flex justify-between">
                                                <span className="mr-auto bg-white dark:bg-zinc-800">{expense.name}</span><span className="bg-white dark:bg-zinc-800"><Price price={+expense.amount} /></span>
                                            </li>
                                        ))
                                        : ''}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
