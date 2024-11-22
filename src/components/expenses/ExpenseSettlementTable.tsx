import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Price from '../Price';
import Modal from '../elements/Modal';
import Button from '../elements/Button';
import SelectField from '../elements/SelectField';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserIcon from '../elements/UserIcon';

declare const window: {
    paypal: any;
} & Window;

interface Participant {
    _id: string;
    name: string;
    email: string;
    profilePhoto?: string;
}

interface Settlement {
    _id: string;
    debtor: string;
    creditor: string;
    amount: number;
    isSettled: boolean;
}

interface settlementHistory {
    _id: string;
    debtor: string;
    creditor: string;
    amount: number;
    settled: boolean;
}

interface ExpenseSettlementTableProps {
    settlements: Settlement[];
    settlementHistory: settlementHistory[]
    participants: Participant[];
    tripId: string;
    token: string;
    onSettlementUpdated: (updatedSettlement: Settlement) => void;
}

const ExpenseSettlementTable: React.FC<ExpenseSettlementTableProps> = ({
    settlements,
    settlementHistory,
    participants,
    tripId,
    token,
    onSettlementUpdated
}) => {
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [activeSettlementId, setActiveSettlementId] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        if (paymentMethod === 'paypal' && activeSettlementId) {
            const activeSettlement = settlements.find(s => s._id === activeSettlementId);

            if (activeSettlement) {
                // Assuming the creditor is the recipient of the payment
                const creditor = participants.find(p => p._id === activeSettlement.creditor);

                if (creditor && creditor.email) {
                    handleSettle(activeSettlement._id, activeSettlement.amount, 'paypal');
                } else {
                    console.error('Creditor email not found.');
                }
            }
        }
    }, [activeSettlementId, paymentMethod, settlements]);

    const getParticipant = (id: string): Participant => {
        return participants.find(p => p._id === id) || { _id: id, name: 'Unknown', email: 'unknown@example.com', profilePhoto: '' };
    };

    const closeModal = () => {
        setActiveSettlementId(null);
        setPaymentMethod('cash'); // Reset payment method
    };

    const handleSettle = async (settlementId: string, settlementAmount: number, paymentMethod: string) => {
        setIsProcessing(true); // Disable the button while processing
        try {
            if (paymentMethod === 'paypal') {
                const debtor = participants.find(p => p._id === settlements.find(s => s._id === settlementId)?.debtor);
                if (debtor) {
                    const email = debtor.email;
                    const response = await axios.post(`${API_BASE_URL}/api/create-paypal-payout`, {
                        email,
                        amount: settlementAmount
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.status === 200) {
                        const updatedSettlement = settlements.find(s => s._id === settlementId);
                        if (updatedSettlement) {
                            const updated = { ...updatedSettlement, isSettled: true };
                            onSettlementUpdated(updated);
                        }
                    }
                }
            } else {
                // Handle cash settlements
                const response = await axios.post(`${API_BASE_URL}/api/trips/${tripId}/settlements/${settlementId}/settle`, {
                    amountToSettle: settlementAmount
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const updatedSettlement = settlements.find(s => s._id === settlementId);
                    if (updatedSettlement) {
                        const updated = { ...updatedSettlement, isSettled: true };
                        onSettlementUpdated(updated);
                    }
                }
            }
        } catch (error) {
            console.error('Error marking settlement as settled', error);
        } finally {
            setIsProcessing(false); // Enable the button after processing
        }
    };


    return (
        <div className="my-6">
            <h3 id="settlementsummary" className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                <span className="text-gradient">{t('settlementSummary')}</span>
            </h3>

            <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">{t('settlementDescription')}</p>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400 mb-8">
                    <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
                        <tr>
                            <th className="px-2 w-4/12 py-3 text-xs">{t('debtor')}</th>
                            <th className="px-2 w-4/12 py-3 text-xs">{t('creditor')}</th>
                            <th className="px-2 w-2/12 py-3 text-xs text-right">{t('amount')}</th>
                            <th className="px-2 w-2/12 py-3 text-xs text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {settlements.length > 0 ? (
                            settlements.map((settlement) => {
                                const debtor = getParticipant(settlement.debtor);
                                const creditor = getParticipant(settlement.creditor);
                                return (
                                    <tr
                                        key={settlement._id}
                                        className={`bg-white border-b dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 ${settlement.isSettled ? 'opacity-50' : ''}`}
                                    >
                                        <td className="px-2 py-4 text-sm text-zinc-800 dark:text-zinc-200 items-center space-x-3">
                                            <div className="flex gap-2 items-center">
                                                <UserIcon
                                                    userName={debtor?.name || ''}
                                                    userId={debtor?._id || ''}
                                                    profilePhoto={debtor?.profilePhoto || ''}
                                                    size={'sm'}
                                                    key={debtor?._id}
                                                />
                                                <div>
                                                    <p className="font-semibold text-xs md:text-sm">{debtor.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-4 text-sm text-zinc-800 dark:text-zinc-200 items-center space-x-3">
                                            <div className="flex gap-2 items-center">
                                                <UserIcon
                                                    userName={creditor?.name || ''}
                                                    userId={creditor?._id || ''}
                                                    profilePhoto={creditor?.profilePhoto || ''}
                                                    size={'sm'}
                                                    key={creditor?._id}
                                                />
                                                <div>
                                                    <p className="font-semibold text-xs md:text-sm">{creditor.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-4 text-xs md:text-sm text-zinc-800 dark:text-zinc-200 text-right">
                                            <Price price={+settlement.amount.toFixed(2)} />
                                        </td>
                                        <td className="px-2 py-4 text-xs md:text-sm text-zinc-800 dark:text-zinc-200 text-center">
                                            {!settlement.isSettled && debtor._id === userId && (
                                                <>
                                                    <a
                                                        className="cursor-pointer text-xs text-base dark:text-zinc-300 hover:underline"
                                                        onClick={() => setActiveSettlementId(settlement._id)}
                                                    >
                                                        {t('settle')}
                                                    </a>
                                                    {activeSettlementId === settlement._id && (
                                                        <Modal onClose={closeModal}>
                                                            <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                                                                <span className="text-gradient">{t('settleDebt')}</span>
                                                            </h3>
                                                            <SelectField
                                                                label={t('settlementType')}
                                                                value={paymentMethod}
                                                                onChange={(value) => setPaymentMethod(value)}
                                                                options={[
                                                                    { value: 'cash', label: t('cash') },
                                                                    { value: 'paypal', label: t('PayPal') },
                                                                ]}
                                                            />

                                                            {paymentMethod === 'paypal' && (
                                                                <div id="paypal-button-container"></div>
                                                            )}

                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant={'primary'}
                                                                    label={isProcessing ? t('processing') : t('settle')}
                                                                    onClick={() => handleSettle(settlement._id, settlement.amount, paymentMethod)}
                                                                    disabled={isProcessing}
                                                                />
                                                                <Button
                                                                    variant={'secondary'}
                                                                    label={t('cancel')}
                                                                    onClick={closeModal}
                                                                />
                                                            </div>
                                                        </Modal>
                                                    )}

                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-2 py-4 text-center text-sm text-zinc-500 dark:text-zinc-300">
                                    {t('noSettlements')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Settled settlements */}
                <h3 id="settlementsummary" className="mb-2 text-xl font-extrabold text-zinc-900 dark:text-white text-xl mt-4">
                    <span className="text-gradient">{t('settled')}</span>
                </h3>

                <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                    <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
                        <tr>
                            <th className="px-2 py-3 w-4/12 text-xs">{t('debtor')}</th>
                            <th className="px-2 py-3 w-4/12 text-xs">{t('creditor')}</th>
                            <th className="px-2 py-3 w-2/12 text-xs text-right">{t('amount')}</th>
                            <th className="px-2 py-3 w-2/12 text-xs text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {settlementHistory.length > 0 ? (
                            settlementHistory.map((settlement) => {
                                const debtor = getParticipant(settlement.debtor);
                                const creditor = getParticipant(settlement.creditor);
                                return (
                                    <tr
                                        key={settlement._id}
                                        className="bg-white border-b dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700"
                                    >
                                        <td className="px-2 py-4 text-sm text-zinc-300 dark:text-zinc-600 items-center space-x-3">
                                            <div className="flex gap-2 items-center">
                                                <UserIcon
                                                    userName={debtor?.name || ''}
                                                    userId={debtor?._id || ''}
                                                    profilePhoto={debtor?.profilePhoto || ''}
                                                    size={'sm'}
                                                    key={debtor?._id}
                                                />
                                                <div>
                                                    <p className="font-semibold text-xs md:text-sm">{debtor.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-4 text-sm text-zinc-300 dark:text-zinc-600 items-center space-x-3">
                                            <div className="flex gap-2 items-center">
                                                <UserIcon
                                                    userName={creditor?.name || ''}
                                                    userId={creditor?._id || ''}
                                                    profilePhoto={creditor?.profilePhoto || ''}
                                                    size={'sm'}
                                                    key={creditor?._id}
                                                />
                                                <div>
                                                    <p className="font-semibold text-xs md:text-sm">{creditor.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-4 text-sm text-zinc-300 dark:text-zinc-600 text-right">
                                            <Price price={+settlement.amount.toFixed(2)} />
                                        </td>
                                        <td className="px-2 py-4 text-sm text-zinc-300 dark:text-zinc-600 text-center">
                                            <span className="text-xs text-zinc-300 dark:text-zinc-600">{t('settled')}</span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-2 py-4 text-center text-sm text-zinc-300 dark:text-zinc-600">
                                    {t('noSettlements')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseSettlementTable;
