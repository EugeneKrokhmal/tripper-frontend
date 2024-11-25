import React from 'react';
import { useTranslation } from 'react-i18next';

import Price from '../Price';
import UserIcon from '../elements/UserIcon';

import { getInvolvedExpenses } from '../../utils/tripUtils';
import type { UsersTableProps } from '../../index';

const UsersTable: React.FC<UsersTableProps> = ({
    admins,
    participants,
    expenses,
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col">
            <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                <thead className="sticky top-0 z-10 text-xs text-zinc-700 uppercase dark:bg-zinc-800 dark:text-zinc-400 bg-gray-200 dark:bg-zinc-900">
                    <tr>
                        <th scope="col" className="px-2 py-3 text-xs">
                            {t('involved')}
                        </th>
                        {/* <th scope="col" className="py-3 text-xs">
                            {t('responsible')}
                        </th> */}
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
                                            {(admins.some(admin => admin._id === participant._id)) &&
                                                (<span className="opacity-50 text-xs font-normal"> (Admin) </span>)
                                            }
                                        </p>
                                    </div>
                                </div>
                            </td>
                            {/* <td className="py-4 text-xs align-top w-3/12">
                                <ol className="list-disc">
                                    {getResponsibleExpensesNames(participant._id).length > 0
                                        ? getResponsibleExpensesNames(participant._id).map((expenseName, index) => (
                                            <li key={index}>{expenseName}</li>
                                        ))
                                        : ''}
                                </ol>
                            </td> */}
                            <td className="px-2 py-4 text-xs align-top md:w-full">
                                {/* Display the names and amounts of expenses the user is involved in */}
                                <ul className="leaders">
                                    {getInvolvedExpenses(expenses, participant._id).length > 0 ? (
                                        <>
                                            {getInvolvedExpenses(expenses, participant._id).map((expense, index) => (
                                                <li key={index} className="flex justify-between">
                                                    <span className="mr-auto bg-white dark:bg-zinc-800">{expense.name}</span>
                                                    <span className="bg-white dark:bg-zinc-800"><Price price={+expense.amount.toFixed(2)} /></span>
                                                </li>
                                            ))}

                                            <li className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100 mt-6">
                                                <span className="mr-auto bg-white dark:bg-zinc-800">Total Share</span>
                                                <span className="bg-white dark:bg-zinc-800">
                                                    <Price
                                                        price={+getInvolvedExpenses(expenses, participant._id).reduce((total, expense) => total + expense.amount, 0).toFixed(2)}
                                                    />
                                                </span>
                                            </li>
                                        </>
                                    ) : (
                                        ''
                                    )}
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
