import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/elements/InputField';
import TextArea from '../components/elements/TextArea';
import Button from '../components/elements/Button';
import SelectField from '../components/elements/SelectField';
import Breadcrumbs from '../components/structure/Breadcrumbs'
import { useTranslation } from 'react-i18next';
import Loader from '../components/structure/Loader';

interface Participant {
    _id: string;
    name: string;
    profilePicture?: string;
}

interface ExpenseDetailPageProps {
    participants: Participant[];
    token: string;
    API_BASE_URL: string;
}

const ExpenseDetailPage: React.FC<ExpenseDetailPageProps> = ({ participants, token, API_BASE_URL }) => {
    const { expenseId, tripId } = useParams<{ expenseId: string; tripId: string }>();
    const [expense, setExpense] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [expenseName, setExpenseName] = useState<string>('');
    const [expenseDescription, setExpenseDescription] = useState<string>('');
    const [amount, setAmount] = useState<number | string>('');
    const [responsibleUser, setResponsibleUser] = useState<string>('');
    const [splitMethod, setSplitMethod] = useState<string>('even');
    const [splitParticipants, setSplitParticipants] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchExpenseDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/trips/${tripId}/expenses/${expenseId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const expenseData = response.data;
                setExpense(expenseData);
                setExpenseName(expenseData.expenseName);
                setExpenseDescription(expenseData.expenseDescription);
                setAmount(expenseData.amount);
                setResponsibleUser(expenseData.responsibleUserId);
                setSplitMethod(expenseData.splitMethod);
                setSplitParticipants(expenseData.splitParticipants || []);
            } catch (err) {
                setError('Failed to fetch expense details');
            } finally {
                setLoading(false);
            }
        };

        if (expenseId && tripId) {
            fetchExpenseDetails();
        }
    }, [expenseId, tripId, API_BASE_URL, token]);


    const handleParticipantToggle = (participantId: string) => {
        if (splitParticipants.includes(participantId)) {
            setSplitParticipants(splitParticipants.filter(id => id !== participantId));
        } else {
            setSplitParticipants([...splitParticipants, participantId]);
        }
    };

    const toggleSplitMethod = () => {
        setSplitMethod(prevMethod => (prevMethod === 'even' ? 'specific' : 'even'));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount as string);
        if (isNaN(parsedAmount)) {
            setError('Please enter a valid amount');
            return;
        }

        const updatedExpense = {
            expenseName,
            expenseDescription,
            amount: parsedAmount,
            responsibleUserId: responsibleUser,
            splitMethod,
            splitParticipants,
        };

        try {
            setLoading(true);
            await axios.put(
                `${API_BASE_URL}/api/trips/${tripId}/expenses/${expenseId}`,
                updatedExpense,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate(`/trip/${tripId}`);
        } catch (err) {
            console.error('Failed to update expense', err);
            setError('Failed to update expense');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader/>

    if (error) return <p>{error}</p>;

    const breadcrumbs = [
        { label: t('goBack'), href: `/trip/${tripId}` },
        { label: expenseName, href: '' }
    ];

    return (
        <>
            <section className="bg-white dark:bg-zinc-900 pt-24">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex flex-col lg:flex-row gap-16 max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
                    <div className="max-w-screen-xl w-full">
                        <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">
                                {t('editExpense')}
                            </span>
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <InputField
                                label={t('expenseName')}
                                type="text"
                                value={expenseName}
                                onChange={(e) => setExpenseName(e.target.value)}
                                required
                            />

                            <TextArea
                                label={t('description')}
                                value={expenseDescription}
                                onChange={(e) => setExpenseDescription(e.target.value)}
                            />

                            <InputField
                                label={t('amount')}
                                type="number"
                                value={amount.toString()}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />

                            <SelectField
                                label={t('responsible')}
                                value={responsibleUser}
                                onChange={(value) => setResponsibleUser(value)}
                                options={participants.map(participant => ({
                                    value: participant._id,
                                    label: participant.name,
                                }))}

                            />

                            <div className="mt-6 mb-4">
                                <p className="text-xs text-zinc-500 dark:text-zinc-300  mb-2">{t('specificSplit')}</p>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={splitMethod === 'specific'}
                                        onChange={toggleSplitMethod}
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                                        {t('specificSplit')}
                                    </span>
                                </label>
                            </div>

                            {splitMethod === 'specific' && (
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">
                                        {t('splitAmong')}
                                    </label>
                                    {participants.map(participant => (
                                        <div key={participant._id} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                checked={splitParticipants.includes(participant._id)}
                                                onChange={() => handleParticipantToggle(participant._id)}
                                                className="w-4 h-4 border border-zinc-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                            />
                                            <label className="ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                                                {participant.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Button type="submit" label={loading ? 'Saving...' : t('save')} variant="primary" disabled={loading} />
                        </form>
                    </div>
                    <div className="flex flex-col gap-16 w-full lg:mt-0 md:w-2/5">
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExpenseDetailPage;
