import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '../elements/InputField';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';
import SelectField from '../elements/SelectField';
import axios from 'axios';
import { useCurrency } from '../CurrencyContext';

interface ExpenseFormProps {
    userId: string;
    participants: any[];
    tripId: string;
    token: string;
    onExpenseAdded: (newExpense: any) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ userId, participants, tripId, token, onExpenseAdded }) => {
    const { t } = useTranslation();
    const [expenseName, setExpenseName] = useState<string>('');
    const [expenseDescription, setExpenseDescription] = useState<string>('');
    const [amount, setAmount] = useState<number | string>('');
    const [splitMethod, setSplitMethod] = useState<string>('even');
    const [splitParticipants, setSplitParticipants] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [responsibleUser, setResponsibleUser] = useState<string>(userId);
    const { currency, convertAmount } = useCurrency();
    const [confirmationFile, setConfirmationFile] = useState<File | null>(null);

    const handleParticipantToggle = (participantId: string) => {
        if (splitParticipants.includes(participantId)) {
            setSplitParticipants(splitParticipants.filter(id => id !== participantId));
        } else {
            setSplitParticipants([...splitParticipants, participantId]);
        }
    };

    const toggleSplitMethod = () => {
        setSplitMethod((prevMethod) => (prevMethod === 'even' ? 'specific' : 'even'));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setConfirmationFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount as string);
        if (isNaN(parsedAmount)) {
            alert(t('pleaseEnterValidAmount'));
            return;
        }

        const newExpense = {
            expenseName,
            expenseDescription,
            amount: convertAmount(parsedAmount),
            currency,
            responsibleUserId: responsibleUser,
            splitMethod,
            splitParticipants: splitMethod === 'even' ? participants.map(p => p._id) : splitParticipants,
            date: new Date(),
            confirmationFile
        };

        try {
            setLoading(true);

            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/trips/${tripId}/expenses`,
                newExpense,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            onExpenseAdded(response.data.expense);

            setExpenseName('');
            setExpenseDescription('');
            setAmount('');
            setResponsibleUser('');
            setSplitParticipants([]);
            setSplitMethod('even');
            setConfirmationFile(null);
        } catch (error) {
            console.error(t('failedToAddExpense'), error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                <span className="text-gradient">
                    {t('addExpense')} ({currency})
                </span>
            </h3>
            <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto">
                <div>
                    <InputField
                        label={t('expenseName')}
                        type="text"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        required
                    />

                    <TextArea
                        label={t('expenseDescription')}
                        value={expenseDescription}
                        onChange={(e) => setExpenseDescription(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <InputField
                        label={`${t('amount')} (${currency})`}
                        type="number"
                        value={amount.toString()}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <SelectField
                        label={t('responsible')}
                        value={responsibleUser}
                        onChange={(value) => setResponsibleUser(value)}
                        options={participants.map(participant => ({
                            value: participant._id,
                            label: participant.name
                        }))}
                        required
                    />
                </div>

                <div className="mt-6 mb-4">
                    <p className="text-xs text-zinc-500 dark:text-zinc-300 mb-2">{t('specificSplit')}</p>
                    <label className="inline-flex items-center cursor-pointer px-1">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={splitMethod === 'specific'}
                            onChange={toggleSplitMethod}
                        />
                        <div className="relative w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-zinc-900 dark:text-zinc-300">{t('specificSplit')}</span>
                    </label>
                </div>

                {splitMethod === 'specific' && (
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">{t('splitAmong')}</label>
                        {participants.map(participant => (
                            <div key={participant._id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={splitParticipants.includes(participant._id)}
                                    onChange={() => handleParticipantToggle(participant._id)}
                                    className="w-4 h-4 border border-zinc-300 rounded bg-zinc-50 focus:ring-3 focus:ring-blue-300 dark:bg-zinc-700 dark:border-zinc-600 dark:focus:ring-blue-600 dark:ring-offset-zinc-800"
                                />
                                <label className="ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                                    {participant.name}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {/* <div className="mt-4">
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                        {t('uploadConfirmation')}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full p-2 border border-zinc-300 dark:border-zinc-900 dark:text-zinc-300 dark:bg-zinc-900 rounded-md mb-4 text-sm block w-full text-sm text-zinc-900 border border-zinc-300 rounded-lg cursor-pointer bg-zinc-50 dark:text-zinc-400 focus:outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400"
                    />
                </div> */}

                <Button type="submit" label={loading ? t('addingExpense') : t('addExpense')} variant="primary" disabled={loading} />
            </form>
        </>
    );
};

export default ExpenseForm;
