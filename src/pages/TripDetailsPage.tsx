import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import Modal from '../components/elements/Modal';
import Button from '../components/elements/Button';
import ExpenseForm from '../components/expenses/ExpenseForm';
import Loader from '../components/structure/Loader';
import { useCurrency } from '../context/CurrencyContext';
import ExpenseSummaryWidget from '../components/widgets/ExpenseSummaryWidget';
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
import TripMap from '../components/trips/TripMap';

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
    const { currency, setCurrency } = useCurrency();
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
    const [remainingOwedToUser, setRemainingOwedToUser] = useState<number>(0);
    const isOwner = trip?.creator?._id === userId;

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!trip?.image && trip?.location?.destination) {
                    const fetchedCityImage = await fetchCityImage(trip.location.destination, UNSPLASH_ACCESS_KEY || '');
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
                setEditMode(false);
            }
        } catch (error) {
            console.error('Failed to update the trip', error);
        }
    };

    const handleDeleteTrip = async () => {
        try {
            if (tripId && token && API_BASE_URL) {
                await deleteTrip(tripId, token, API_BASE_URL);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Failed to delete the trip', error);
        }
    };

    const tripDuration = trip?.startDate && trip?.endDate ? Math.ceil(
        (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)
    ) : 0;

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
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        if (userId) {
            setTotalPaidByUser(calculateTotalPaidByUser([...expenses, newExpense], userId));
            setRemainingOwedToUser(calculateRemainingOwedToUser(settlements, userId));
        }
        setTotalCost(calculateTotalCost([...expenses, newExpense]));
        closeAddExpenseModal();
    };

    const handleExpenseDeleted = (updatedExpenses: any[]) => {
        setExpenses(updatedExpenses);
        if (userId) {
            setTotalPaidByUser(calculateTotalPaidByUser(updatedExpenses, userId));
            setRemainingOwedToUser(calculateRemainingOwedToUser(settlements, userId));
        }
        setTotalCost(calculateTotalCost(updatedExpenses));
    };

    const handleSettlementUpdated = (updatedSettlement: Settlement) => {
        setSettlementsHistory(prevHistory => [...prevHistory, updatedSettlement]);
        setSettlements(prevSettlements => prevSettlements.filter(settlement => settlement._id !== updatedSettlement._id));
    };

    const handleAddExpenseClick = () => {
        setIsAddExpenseModalOpen(true);
    };

    const closeAddExpenseModal = () => {
        setIsAddExpenseModalOpen(false);
    };

    const handleImageUploadSuccess = (newImageUrl: string) => {
        setTrip({ ...trip, image: newImageUrl });
    };

    const breadcrumbs = [
        { label: t('myTrips'), href: '#/dashboard' },
        { label: trip?.name, href: '' }
    ];

    if (!trip) {
        return (
            <div className="h-full flex items-center justify-center pb-20">
                <Loader />
            </div>
        );
    }

    const imageUrl = trip?.image
        ? `${API_BASE_URL}/${trip.image}`
        : cityImage || `https://ui-avatars.com/api/?name=${trip?.name}&background=random`;

    return (
        <section className="bg-white dark:bg-zinc-800">
            <div className="relative w-full max-w-screen-xl mx-auto mb-4">
                <img
                    className="object-cover h-64 w-full"
                    src={imageUrl}
                    alt={`${trip.location.destination}`}
                />
                {(isOwner || trip.administrators.includes(userId)) && (
                    <>
                        <ShareTrip
                            tripId={trip?._id}
                            tripName={trip?.name}
                            tripImage={trip?.image}
                            startDate={trip?.startDate}
                            endDate={trip?.endDate}
                            tripDescription={trip?.description}
                            isOwner={isOwner}
                            isAdmin={trip.administrators.includes(userId)}
                            joinLink={joinLink}
                            onGenerateJoinLink={handleGenerateJoinLink}
                            loadingJoinLink={loadingJoinLink}
                            error={error}
                        />
                        <EditTripForm
                            id={trip._id}
                            initialTripName={trip.name}
                            initialTripDescription={trip.description}
                            initialDestination={trip.location.destination}
                            initialStartDate={trip.startDate}
                            initialEndDate={trip.endDate}
                            initialCoordinates={trip.location.coordinates}
                            onSubmit={handleEditTrip}
                            onCancel={() => setEditMode(false)}
                            onDeleteClick={handleDeleteTrip}
                            onImageUploadSuccess={handleImageUploadSuccess}
                        />
                    </>
                )}
            </div>

            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-8 lg:gap-8 max-w-screen-xl mx-auto px-4 pt-8 pb-32 lg:pt-16 lg:pb-24">
                <ExpenseSummaryWidget
                    totalPaidByUser={totalPaidByUser}
                    totalCost={totalCost}
                    fairShare={fairShare}
                    onFairShareUpdate={(fairShare, settlements) => {
                        setFairShare(fairShare);
                        setSettlements(settlements);
                    }}
                    tripId={tripId || ''}
                    remainingOwedToUser={remainingOwedToUser}
                    onAddExpenseClick={handleAddExpenseClick}
                    participants={trip.participants}
                    expenses={trip.expenses}
                    isOwner={isOwner}
                    admins={trip.administrators}
                />

                <div className="md:w-8/12">
                    <TripInfo
                        tripName={trip.name}
                        tripDescription={trip.description}
                        startDate={trip.startDate}
                        endDate={trip.endDate}
                        tripDuration={tripDuration}
                        isOwner={isOwner}
                        joinLink={joinLink}
                        onGenerateJoinLink={handleGenerateJoinLink}
                        loadingJoinLink={loadingJoinLink}
                        error={error}
                        participants={trip.participants}
                    />

                    <div className="mb-2 md:mb-8">
                        <div className="rounded p-2 bg-zinc-50 dark:bg-zinc-900 md:p-0 md:bg-white md:dark:bg-zinc-800 col-span-1">
                            <TripParticipants
                                tripId={tripId || ''}
                                userId={userId || ''}
                                isOwner={isOwner}
                                admins={trip.administrators}
                                participants={trip.participants}
                                expenses={trip.expenses}
                            />
                        </div>
                    </div>

                    <div className="rounded p-2 bg-zinc-50 dark:bg-zinc-900 md:p-0 md:bg-white md:dark:bg-zinc-800 mb-8">
                        <TripMap
                            coordinates={trip.location.coordinates}
                            destination={trip.location.destination || ''}
                        />
                    </div>

                    <ExpenseSettlementTable
                        tripId={trip._id || ''}
                        settlements={trip.settlements}
                        settlementHistory={trip.settlementHistory || []}
                        participants={trip.participants}
                        token={token || ''}
                        onSettlementUpdated={handleSettlementUpdated}
                    />

                    <hr className="my-8 dark:border-zinc-600" />

                    <TripTimeline
                        startDate={trip.startDate}
                        isOwner={isOwner}
                        isAdmin={trip.administrators.includes(userId)}
                        endDate={trip.endDate}
                        tripId={tripId || ''}
                        token={token || ''}
                        API_BASE_URL={API_BASE_URL || ''}
                        OPEN_CAGE_API_KEY={process.env.REACT_APP_OPENCAGE_API_KEY || ''}
                    />

                    <hr className="my-8 dark:border-zinc-600" />
                </div>

                <aside
                    className={`bg-white dark:bg-zinc-800 z-10 md:w-3/12 lg:w-4/12`}
                    aria-label="Sidebar"
                >
                    <div className="w-full">
                        <div className="hidden md:block mb-6">
                            <ExpenseSummary
                                totalPaidByUser={totalPaidByUser}
                                totalCost={totalCost}
                                fairShare={fairShare}
                                tripId={tripId || ''}
                                remainingOwedToUser={remainingOwedToUser}
                            />

                            <Button label={t('addExpense')} onClick={handleAddExpenseClick} variant="primary" />
                        </div>

                        <ExpensesList
                            userId={userId || ''}
                            isOwner={isOwner}
                            expenses={expenses}
                            participants={trip.participants}
                            tripId={tripId || ''}
                            token={token || ''}
                            onExpenseAdded={handleExpenseAdded}
                            onExpenseDeleted={handleExpenseDeleted}
                        />
                    </div>
                </aside>
            </div>

            {/* Modal for Adding Expense */}
            {isAddExpenseModalOpen && (
                <Modal onClose={closeAddExpenseModal}>
                    <ExpenseForm
                        isOwner={isOwner}
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
