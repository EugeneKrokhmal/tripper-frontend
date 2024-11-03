import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TripParticipants from '../components/trips/TripParticipants';
import TripInfo from '../components/trips/TripInfo';
import ShareTrip from '../components/trips/ShareTrip';
import ExpensesList from '../components/expenses/ExpensesList';
import ExpenseSummary from '../components/expenses/ExpenseSummary';
import ExpenseSettlementTable from '../components/expenses/ExpenseSettlementTable';
import Breadcrumbs from '../components/structure/Breadcrumbs';
import TripTimeline from '../components/trips/TripTimeline';
import EditTripForm from '../components/trips/EditTripForm';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/structure/Sidebar';
import Modal from '../components/elements/Modal';
import Button from '../components/elements/Button';
import ExpenseForm from '../components/expenses/ExpenseForm';
import PlusIcon from '../images/icons/plus.svg';
import Loader from '../components/structure/Loader';
import { useCurrency } from '../components/CurrencyContext';

interface Settlement {
    _id: string;
    debtor: string;
    creditor: string;
    amount: number;
    settled?: boolean;
}

const TripDetailsPage: React.FC = () => {
    const [trip, setTrip] = useState<any | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [tripName, setTripName] = useState<string>('');
    const [tripDescription, setTripDescription] = useState<string>('');
    const { currency, setCurrency } = useCurrency();
    const [destination, setDestination] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
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
    const { tripId } = useParams<{ tripId: string }>();
    const token = useSelector((state: RootState) => state.auth.token);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
    const { t } = useTranslation();
    const remainingOwedToUser = 0;

    useEffect(() => {
        const fetchCityImage = async () => {
            if (!UNSPLASH_ACCESS_KEY || !destination) return;

            try {
                const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                    params: {
                        query: destination + 'center',
                        client_id: UNSPLASH_ACCESS_KEY,
                        per_page: 1,
                    },
                });

                if (response.data.results.length > 0) {
                    setCityImage(response.data.results[0].urls.small);
                }
            } catch (error) {
                console.error('Error fetching Unsplash image:', error);
            }
        };

        fetchTripDetails();

        if (!trip?.image) {
            fetchCityImage();
        }
    }, [API_BASE_URL, token, tripId, destination, UNSPLASH_ACCESS_KEY, trip?.image]);

    const fetchTripDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/trips/${tripId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const tripData = response.data;
            setTrip(tripData);
            setTripName(tripData.name);
            setTripDescription(tripData.description);
            setDestination(tripData.location.destination);
            setCurrency(tripData.currency || '');
            setStartDate(tripData.startDate);
            setEndDate(tripData.endDate);
            setExpenses(tripData.expenses);
            setJoinLink(tripData.joinToken ? `${window.location.origin}/tripper-frontend/#/login?redirect=/join/${tripData._id}/${tripData.joinToken}` : null);
            calculateTotalPaidByUser(tripData.expenses);
            calculateTotalCost(tripData.expenses);
            setFairShare(tripData.fairShare || 0);
            setSettlements(tripData.settlements || []);
            setSettlementsHistory(tripData.settlementHistory || []);
        } catch (err) {
            setError('Failed to fetch trip details');
        }
    };

    const handleEditExpense = (expenseId: string) => {
        navigate(`/trips/${tripId}/expenses/${expenseId}/edit`, {
            state: { participants: trip.participants, token },
        });
    };

    const calculateTotalPaidByUser = (expenses: any[]) => {
        const totalPaid = expenses
            .filter(expense => expense.responsibleUserId === userId)
            .reduce((total, expense) => total + expense.amount, 0);
        setTotalPaidByUser(totalPaid);
    };

    const calculateTotalCost = (expenses: any[]) => {
        const total = expenses.reduce((total, expense) => {
            if (expense.splitMethod === 'even') {
                return total + expense.amount / expense.splitParticipants.length;
            } else {
                return total + expense.amount;
            }
        }, 0);
        setTotalCost(total);
    };

    const handleEditTrip = async (updatedTrip: {
        tripName: string;
        tripDescription: string;
        destination: string;
        startDate: string;
        endDate: string;
        coordinates: { lat: number; lng: number };
    }) => {
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

            await axios.put(`${API_BASE_URL}/api/trips/${tripId}`, updatedTripData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTrip({ ...trip, ...updatedTripData });
            setEditMode(false);
        } catch (err) {
            console.error('Failed to update the trip', err);
        }
    };

    const handleDeleteTrip = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/api/trips/${tripId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/dashboard');
        } catch (err) {
            console.error('Failed to delete the trip', err);
        }
    };

    const tripDuration = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    const handleGenerateJoinLink = async () => {
        setLoadingJoinLink(true);
        setError(null);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/trips/${tripId}/generate-join-link`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setJoinLink(`${response.data.joinLink}`);
        } catch (err) {
            setError('Failed to generate join link.');
        } finally {
            setLoadingJoinLink(false);
        }
    };

    const handleExpenseAdded = (newExpense: any) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        calculateTotalPaidByUser([...expenses, newExpense]);
        calculateTotalCost([...expenses, newExpense]);
        fetchTripDetails();
    };

    const handleExpenseDeleted = (updatedExpenses: any[]) => {
        setExpenses(updatedExpenses);
        calculateTotalPaidByUser(updatedExpenses);
        calculateTotalCost(updatedExpenses);
        fetchTripDetails();
    };

    if (!trip) {
        return (
            <div className="pb-20 h-screen flex tems-center justify-center">
                <Loader />
            </div>
        );
    }

    const breadcrumbs = [
        { label: t('home'), href: '#/' },
        { label: t('myTrips'), href: '/dashboard' },
        { label: tripName, href: '' }
    ];

    const handleSettlementUpdated = (updatedSettlement: Settlement) => {
        // Move fully settled debts to the settlement history
        setSettlementsHistory(prevHistory => [
            ...prevHistory,
            updatedSettlement,
        ]);

        // Remove the settled item from the settlements array
        setSettlements(prevSettlements => {
            return prevSettlements.filter(settlement => settlement._id !== updatedSettlement._id);
        });
    };

    const handleAddExpenseClick = () => {
        setIsAddExpenseModalOpen(true);
    };

    const closeAddExpenseModal = () => {
        setIsAddExpenseModalOpen(false);
    };

    const imageUrl = trip.image
        ? `${API_BASE_URL}/${trip.image}`
        : cityImage || `https://ui-avatars.com/api/?name=${trip.name}&background=random`;

    return (
        <section className="bg-white dark:bg-zinc-800">
            <div className="relative w-full max-w-screen-xl my-8 mx-auto px-4">
                <img
                    className="object-cover rounded h-64 w-full mb-4"
                    src={imageUrl}
                    alt={`${trip.location.destination}`}
                />
                {trip.creator._id === userId && (
                    <>
                        <ShareTrip
                            isOwner={trip.creator._id === userId}
                            joinLink={joinLink}
                            onGenerateJoinLink={handleGenerateJoinLink}
                            loadingJoinLink={loadingJoinLink}
                            error={error}
                        />
                        <EditTripForm
                            id={trip._id}
                            initialTripName={tripName}
                            initialTripDescription={tripDescription}
                            initialDestination={destination}
                            initialStartDate={startDate}
                            initialEndDate={endDate}
                            initialCoordinates={trip.location.coordinates}
                            onSubmit={handleEditTrip}
                            onCancel={() => setEditMode(false)}
                            onDeleteClick={handleDeleteTrip}
                        />

                    </>
                )}
            </div>

            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-8 lg:gap-8 max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
                <Sidebar />

                <div className="max-w-screen-md md:w-7/12 lg:w-3/4 xl:w-full">
                    <TripInfo
                        tripName={tripName}
                        tripDescription={tripDescription}
                        destination={destination}
                        startDate={startDate}
                        endDate={endDate}
                        tripDuration={tripDuration}
                        isOwner={trip.creator._id === userId}
                        joinLink={joinLink}
                        onGenerateJoinLink={handleGenerateJoinLink}
                        loadingJoinLink={loadingJoinLink}
                        error={error}
                        participants={trip.participants}
                        coordinates={trip.location.coordinates} // Updated coordinates passed here
                    />

                    <hr className="my-8" />

                    <TripParticipants
                        tripId={tripId || ''}
                        isOwner={trip.creator._id === userId}
                        participants={trip.participants}
                        expenses={trip.expenses}
                    />

                    <hr className="my-8" />

                    <TripTimeline
                        startDate={startDate}
                        isOwner={trip.creator._id === userId}
                        endDate={endDate}
                        tripId={tripId || ''}
                        token={token || ''}
                        API_BASE_URL={API_BASE_URL || ''}
                        OPEN_CAGE_API_KEY={process.env.REACT_APP_OPENCAGE_API_KEY || ''}
                    />

                    <hr className="my-8" />

                    <ExpenseSettlementTable
                        tripId={trip._id || ''}
                        settlements={settlements}
                        settlementHistory={settlementsHistory}
                        participants={trip.participants}
                        token={token || ''}
                        onSettlementUpdated={handleSettlementUpdated}
                    />

                    <hr className="my-8" />

                </div>
                <div className="md:static md:flex flex-col gap-8 md:w-4/12 lg:w-2/5 xl:w-3/5w w-full lg:mt-0 xl:w-2/5">
                    <div className="md:sticky top-24 flex flex-col">
                        <ExpenseSummary
                            totalPaidByUser={totalPaidByUser}
                            totalCost={totalCost}
                            fairShare={fairShare}
                            onFairShareUpdate={(fairShare, settlements) => {
                                setFairShare(fairShare);
                                setSettlements(settlements);
                            }}
                            tripId={tripId || ''}
                            remainingOwedToUser={remainingOwedToUser}
                        />

                        {/* Button to open Add Expense modal */}
                        <Button label={t('addExpense')} onClick={handleAddExpenseClick} variant="primary" />

                        <ExpensesList
                            userId={userId || ''}
                            expenses={expenses}
                            participants={trip.participants}
                            tripId={tripId || ''}
                            token={token || ''}
                            onExpenseAdded={handleExpenseAdded}
                            onExpenseDeleted={handleExpenseDeleted}
                            onEditExpense={handleEditExpense}
                        />
                    </div>
                </div>

                {/* Button to open Add Expense modal */}
                <div
                    onClick={handleAddExpenseClick}
                    className="bg-gradient-to-r to-transparent from-sky-400 grid justify-center items-center rounded-full backdrop-blur-sm fixed z-50 w-16 h-16 border border-zinc-200 bottom-4 left-4 dark:border-zinc-600 lg:hidden h-16"
                >
                    <img className="w-6" src={PlusIcon} alt={t('addExpense')} />
                </div>
            </div>

            {/* Modal for Adding Expense */}
            {isAddExpenseModalOpen && (
                <Modal onClose={closeAddExpenseModal}>
                    <ExpenseForm
                        userId={userId || ''}
                        participants={trip.participants}
                        tripId={tripId || ''}
                        token={token || ''}
                        onExpenseAdded={handleExpenseAdded}
                    />
                </Modal>
            )}
        </section>
    );
};

export default TripDetailsPage;
