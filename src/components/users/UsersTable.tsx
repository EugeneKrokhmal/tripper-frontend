import React from 'react';
import { useTranslation } from 'react-i18next';
import Price from '../Price';
import UserIcon from '../elements/UserIcon';


interface UsersTableProps {
    isOwner: boolean;
    admins: [];
    participants: { _id: string; name: string, profilePhoto: string }[];
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
    admins,
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
                <thead className="sticky top-0 z-10 text-xs text-zinc-700 uppercase dark:bg-zinc-800 dark:text-zinc-400">
                    <tr>
                        <th scope="col" className="px-2 py-3 text-xs">
                            {t('involved')}
                        </th>
                        <th scope="col" className="py-3 text-xs">
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
                            className="bg-white border-b border-zinc-100 dark:bg-zinc-800 dark:border-zinc-700"
                        >
                            <td className="px-2 py-4 text-sm text-zinc-800 dark:text-zinc-200 md:space-x-3 w-4/12 align-top">
                                <div className="flex gap-2 items-center">
                                    <div className="">
                                        <UserIcon
                                            userName={participant.name}
                                            userId={participant._id}
                                            profilePhoto={participant.profilePhoto}
                                            size={'xs'}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-xs md:text-sm">{participant.name}
                                            {(admins as string[]).includes(participant._id) &&
                                                (<span className="opacity-50 text-xs font-normal"> (Admin) </span>)
                                            }
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 text-xs align-top w-3/12">
                                {/* Display the names of expenses the user is responsible for */}
                                <ol className="list-disc">
                                    {getResponsibleExpensesNames(participant._id).length > 0
                                        ? getResponsibleExpensesNames(participant._id).map((expenseName, index) => (
                                            <li key={index}>{expenseName}</li>
                                        ))
                                        : ''}
                                </ol>
                            </td>
                            <td className="px-2 py-4 text-xs align-top md:w-full">
                                {/* Display the names and amounts of expenses the user is involved in */}
                                <ul className="leaders">
                                    {getInvolvedExpenses(participant._id).length > 0
                                        ? getInvolvedExpenses(participant._id).map((expense, index) => (
                                            <li key={index} className="flex justify-between">
                                                <span className="mr-auto bg-white dark:bg-zinc-800">{expense.name}</span><span className="bg-white dark:bg-zinc-800"><Price price={+expense.amount.toFixed(2)} /></span>
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
