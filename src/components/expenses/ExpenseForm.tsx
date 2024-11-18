import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '../elements/InputField';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';
import SelectField from '../elements/SelectField';
import axios from 'axios';
import { useCurrency } from '../../context/CurrencyContext';
import UserIcon from '../elements/UserIcon';

interface ExpenseFormProps {
    userId: string;
    participants: any[];
    tripId: string;
    token: string;
    onExpenseAdded?: (newExpense: any) => void;
    onExpenseUpdated?: (updatedExpense: any) => void;
    expenseToEdit?: any; // Add this prop to hold expense data when editing
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    userId,
    participants,
    tripId,
    token,
    onExpenseAdded,
    onExpenseUpdated,
    expenseToEdit
}) => {
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

    // Populate form with existing data if editing
    useEffect(() => {
        if (expenseToEdit) {
            setExpenseName(expenseToEdit.expenseName);
            setExpenseDescription(expenseToEdit.expenseDescription);
            setAmount(expenseToEdit.amount);
            setSplitMethod(expenseToEdit.splitMethod);
            setSplitParticipants(expenseToEdit.splitParticipants || []);
            setResponsibleUser(expenseToEdit.responsibleUserId);
        }
    }, [expenseToEdit]);

    const handleParticipantToggle = (participantId: string) => {
        setSplitParticipants(prev =>
            prev.includes(participantId)
                ? prev.filter(id => id !== participantId)
                : [...prev, participantId]
        );
    };

    const toggleSplitMethod = () => {
        setSplitMethod(prev => (prev === 'even' ? 'specific' : 'even'));
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

        const expenseData = {
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

            if (expenseToEdit) {
                // Update existing expense
                await axios.put(
                    `${process.env.REACT_APP_API_BASE_URL}/api/trips/${tripId}/expenses/${expenseToEdit._id}`,
                    expenseData,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                onExpenseUpdated && onExpenseUpdated({ ...expenseData, _id: expenseToEdit._id });
            } else {
                // Add new expense
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/trips/${tripId}/expenses`,
                    expenseData,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                onExpenseAdded && onExpenseAdded(response.data.expense);
            }

            resetForm();
        } catch (error) {
            console.error(t('failedToAddExpense'), error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setExpenseName('');
        setExpenseDescription('');
        setAmount('');
        setResponsibleUser(userId);
        setSplitParticipants([]);
        setSplitMethod('even');
        setConfirmationFile(null);
    };

    return (
        <>
            <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                <span className="text-gradient">
                    {expenseToEdit ? t('editExpense') : t('addExpense')}
                </span>
            </h3>
            <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto">
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
                <InputField
                    label={`${t('amount')} (${currency})`}
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
                        label: participant.name
                    }))}
                    required
                />

                <div className="my-4">
                    <label className="inline-flex self-end tems-center cursor-pointer px-1">
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
                                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={splitParticipants.includes(participant._id)}
                                        onChange={() => handleParticipantToggle(participant._id)}
                                        className="w-4 h-4 border border-zinc-300 rounded-xl bg-zinc-50 focus:ring-3 dark:bg-zinc-700 dark:border-zinc-600 dark:ring-offset-zinc-800"
                                    />
                                    <UserIcon
                                        userName={participant?.name || ''}
                                        userId={participant?._id || ''}
                                        profilePhoto={participant?.profilePhoto || ''}
                                        size={'xs'}
                                        key={participant?._id}
                                    />
                                    {participant.name}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                <Button variant="primary" type="submit" label={loading ? t('saving') : (expenseToEdit ? t('editExpense') : t('addExpense'))} />
            </form>
        </>
    );
};

export default ExpenseForm;
