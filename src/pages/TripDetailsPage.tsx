import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';

import TripParticipants from '../components/trips/TripParticipants';
import TripInfo from '../components/trips/TripInfo';
import ShareTrip from '../components/trips/ShareTrip';
import ExpensesList from '../components/expenses/ExpensesList';
import ExpenseSummary from '../components/expenses/ExpenseSummary';
import ExpenseSettlementTable from '../components/expenses/ExpenseSettlementTable';
import Breadcrumbs from '../components/structure/Breadcrumbs';
import TripTimeline from '../components/trips/TripTimeline';
import EditTripForm from '../components/trips/EditTripForm';
import Modal from '../components/elements/Modal';
import Button from '../components/elements/Button';
import ExpenseForm from '../components/expenses/ExpenseForm';
import Loader from '../components/structure/Loader';
import ExpenseSummaryWidget from '../components/widgets/ExpenseSummaryWidget';
import TripMap from '../components/trips/TripMap';

import {
    calculateTotalPaidByUser,
    calculateTotalCost,
    calculateRemainingOwedToUser,
    fetchCityImage
} from '../utils/tripUtils';
import {
    fetchTripDetails,
    updateTripDetails,
    deleteTrip,
    generateJoinLink
} from '../api/tripApi';

interface Settlement {
    _id: string;
    debtor: string;
    creditor: string;
    amount: number;
    settled?: boolean;
}

const TripDetailsPage: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { currency, setCurrency } = useCurrency();

    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY || '';

    const [trip, setTrip] = useState<any | null>(null);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [totalPaidByUser, setTotalPaidByUser] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [fairShare, setFairShare] = useState<number>(0);
    const [settlements, setSettlements] = useState<any[]>([]);
    const [settlementsHistory, setSettlementsHistory] = useState<any[]>([]);
    const [joinLink, setJoinLink] = useState<string | null>(null);
    const [loadingJoinLink, setLoadingJoinLink] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cityImage, setCityImage] = useState<string>('');
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
    const [remainingOwedToUser, setRemainingOwedToUser] = useState<number>(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isOwner = trip?.creator?._id === userId;

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!trip?.image && trip?.location?.destination) {
                    const fetchedCityImage = await fetchCityImage(trip.location.destination, UNSPLASH_ACCESS_KEY);
                    setCityImage(fetchedCityImage || '');
                }

                if (tripId && token && API_BASE_URL) {
                    const tripData = await fetchTripDetails(tripId, token, API_BASE_URL);
                    setTrip(tripData);
                    setExpenses(tripData.expenses);
                    setCurrency(tripData.currency || '');

                    if (userId) {
                        setTotalPaidByUser(calculateTotalPaidByUser(tripData.expenses, userId));
                        setRemainingOwedToUser(calculateRemainingOwedToUser(tripData.settlements, userId));
                    }
                    setTotalCost(calculateTotalCost(tripData.expenses));
                }
            } catch (error) {
                console.error('Failed to fetch trip details');
            }
        };

        loadData();
    }, [tripId, token, API_BASE_URL, UNSPLASH_ACCESS_KEY, userId, trip?.image, trip?.location?.destination]);

    const handleEditTrip = async (updatedTrip: any) => {
        try {
            const updatedTripData = {
                name: updatedTrip.tripName,
                description: updatedTrip.tripDescription,
                location: {
                    destination: updatedTrip.destination,
                    coordinates: updatedTrip.coordinates,
                },
                startDate: updatedTrip.startDate,
                endDate: updatedTrip.endDate,
            };

            if (tripId && token && API_BASE_URL) {
                await updateTripDetails(tripId, updatedTripData, token, API_BASE_URL);
                setTrip({ ...trip, ...updatedTripData });
            }
        } catch (error) {
            console.error('Failed to update the trip', error);
        }
    };

    const confirmDeleteTrip = async () => {
        try {
            if (tripId && token && API_BASE_URL) {
                await deleteTrip(tripId, token, API_BASE_URL);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Failed to delete the trip', error);
        } finally {
            closeDeleteModal();
        }
    };

    const handleGenerateJoinLink = async () => {
        setLoadingJoinLink(true);
        setError(null);
        try {
            if (tripId && token && API_BASE_URL) {
                const generatedLink = await generateJoinLink(tripId, token, API_BASE_URL);
                setJoinLink(generatedLink);
            }
        } catch (error) {
            setError('Failed to generate join link.');
        } finally {
            setLoadingJoinLink(false);
        }
    };

    const handleExpenseAdded = (newExpense: any) => {
        if (!userId) return;
        setExpenses([...expenses, newExpense]);
        setTotalPaidByUser(calculateTotalPaidByUser([...expenses, newExpense], userId));
        setRemainingOwedToUser(calculateRemainingOwedToUser(settlements, userId));
        setTotalCost(calculateTotalCost([...expenses, newExpense]));
        closeAddExpenseModal();
    };

    const handleExpenseDeleted = (updatedExpenses: any[]) => {
        if (!userId) return;
        setExpenses(updatedExpenses);
        setTotalPaidByUser(calculateTotalPaidByUser(updatedExpenses, userId));
        setRemainingOwedToUser(calculateRemainingOwedToUser(settlements, userId));
        setTotalCost(calculateTotalCost(updatedExpenses));
    };

    const handleEditExpense = (updatedExpense: any) => {
        const updatedExpenses = expenses.map((expense) =>
            expense._id === updatedExpense._id ? updatedExpense : expense
        );

        setExpenses(updatedExpenses);
    };

    const handleParticipantDeleted = async () => {
        try {
            if (tripId && token && API_BASE_URL) {
                const updatedTrip = await fetchTripDetails(tripId, token, API_BASE_URL);
                setTrip(updatedTrip);
            }
        } catch (error) {
            console.error('Failed to refresh participants list:', error);
        }
    };

    const handleSettlementUpdated = (updatedSettlement: Settlement) => {
        setSettlements(prevSettlements => prevSettlements.filter(s => s._id !== updatedSettlement._id));
        setSettlementsHistory(prevHistory => [...prevHistory, updatedSettlement]);
    };

    const tripDuration = trip?.startDate && trip?.endDate
        ? Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const closeAddExpenseModal = () => setIsAddExpenseModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const imageUrl = trip?.image
        ? `${API_BASE_URL}/${trip.image}`
        : cityImage || `https://ui-avatars.com/api/?name=${trip?.name}&background=random`;

    if (!trip) {
        return (
            <div className="h-full flex items-center justify-center pb-20">
                <Loader />
            </div>
        );
    }

    const handleImageUploadSuccess = (newImageUrl: string) => {
        setTrip({ ...trip, image: newImageUrl });
    };

    const breadcrumbs = [
        { label: t('myTrips'), href: '#/dashboard' },
        { label: trip?.name, href: '' }
    ];

    return (
        <section className="bg-white dark:bg-zinc-800">
            <div className="relative w-full max-w-screen-xl mx-auto mb-4">
                <img
                    className="object-cover h-64 w-full"
                    src={imageUrl}
                    alt={trip?.location?.destination || 'Trip image'}
                />
                {(isOwner || trip.administrators.includes(userId)) && (
                    <>
                        <ShareTrip {...{
                            tripId: trip._id,
                            tripName: trip.name,
                            tripImage: trip.image,
                            startDate: trip.startDate,
                            endDate: trip.endDate,
                            tripDescription: trip.description,
                            isOwner,
                            isAdmin: trip.administrators.includes(userId),
                            joinLink,
                            onGenerateJoinLink: handleGenerateJoinLink,
                            loadingJoinLink,
                            error,
                        }} />
                        <EditTripForm {...{
                            participants: trip.participants,
                            id: trip._id,
                            initialTripName: trip.name,
                            initialTripDescription: trip.description,
                            initialDestination: trip.location.destination,
                            initialStartDate: trip.startDate,
                            initialEndDate: trip.endDate,
                            initialCoordinates: trip.location.coordinates,
                            onSubmit: handleEditTrip,
                            onCancel: closeDeleteModal,
                            onDeleteClick: openDeleteModal,
                            onImageUploadSuccess: handleImageUploadSuccess,
                            onParticipantDelete: () => { handleParticipantDeleted() }
                        }} />
                    </>
                )}
            </div>

            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto px-4 pb-36">
                {/* Expense Summary */}
                <ExpenseSummaryWidget {...{
                    totalPaidByUser,
                    totalCost,
                    fairShare,
                    onFairShareUpdate: (fair, settlements) => {
                        setFairShare(fair);
                        setSettlements(settlements);
                    },
                    tripId: tripId || '',
                    remainingOwedToUser,
                    onAddExpenseClick: () => setIsAddExpenseModalOpen(true),
                    participants: trip.participants,
                    expenses: trip.expenses,
                    isOwner,
                    admins: trip.administrators,
                }} />

                <div className="w-full lg:col-span-2">
                    <TripInfo {...{
                        tripName: trip.name,
                        tripDescription: trip.description,
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                        tripDuration,
                        isOwner,
                        joinLink,
                        onGenerateJoinLink: handleGenerateJoinLink,
                        loadingJoinLink,
                        error,
                        participants: trip.participants,
                    }} />

                    <div className="rounded bg-zinc-50 dark:bg-zinc-900 p-4 mb-4">
                        <TripParticipants {...{
                            tripId: tripId || '',
                            userId: userId || '',
                            isOwner,
                            admins: trip.administrators,
                            participants: trip.participants,
                            expenses: expenses,
                        }} />
                    </div>

                    <TripMap {...{
                        coordinates: trip.location.coordinates,
                        destination: trip.location.destination || '',
                    }} />

                    <ExpenseSettlementTable {...{
                        tripId: tripId || '',
                        settlements,
                        settlementHistory: trip.settlementHistory || [],
                        participants: trip.participants,
                        token: token || '',
                        onSettlementUpdated: handleSettlementUpdated,
                    }} />

                    <TripTimeline {...{
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                        tripId: tripId || '',
                        token: token || '',
                        isOwner,
                        isAdmin: trip.administrators.includes(userId),
                        API_BASE_URL,
                        OPEN_CAGE_API_KEY: process.env.REACT_APP_OPENCAGE_API_KEY || '',
                    }} />
                </div>

                <aside className="bg-white dark:bg-zinc-800 w-full lg:col-span-1 flex flex-col">
                    <div className="hidden md:block md:mb-8">
                        <ExpenseSummary {...{
                            totalPaidByUser,
                            totalCost,
                            fairShare,
                            tripId: tripId || '',
                            remainingOwedToUser,
                        }} />

                        <Button label={t('addExpense')} onClick={() => setIsAddExpenseModalOpen(true)} variant="primary" />
                    </div>

                    <ExpensesList {...{
                        userId: userId || '',
                        isOwner,
                        expenses,
                        participants: trip.participants,
                        tripId: tripId || '',
                        token: token || '',
                        onExpenseAdded: handleExpenseAdded,
                        onExpenseDeleted: handleExpenseDeleted,
                        onEditExpense: handleEditExpense,
                    }} />
                </aside>
            </div>

            {/* Modals */}
            {isAddExpenseModalOpen && (
                <Modal onClose={closeAddExpenseModal}>
                    <ExpenseForm {...{
                        isOwner,
                        userId: userId || '',
                        participants: trip.participants,
                        tripId: tripId || '',
                        token: token || '',
                        onExpenseAdded: handleExpenseAdded,
                    }} />
                </Modal>
            )}

            {isDeleteModalOpen && (
                <Modal onClose={closeDeleteModal}>
                    <div className="text-zinc-900 dark:text-zinc-300">
                        <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl">
                            <span className="text-gradient">
                                {t('confirmDelete')}
                            </span>
                        </h3>
                        <p>{t('deleteWarning')}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button label={t('cancel')} onClick={closeDeleteModal} variant="primary" />
                            <Button label={t('delete')} onClick={confirmDeleteTrip} variant="secondary" />
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default TripDetailsPage;
