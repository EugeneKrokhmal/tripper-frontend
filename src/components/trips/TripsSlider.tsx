import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TripCard from '../trips/TripCard';
import { useTranslation } from 'react-i18next';
import Loader from '../structure/Loader';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface Trip {
    _id: string;
    name: string;
    creator: { _id: string; name: string; email: string };
    participants: { _id: string; name: string; email: string }[];
    startDate: string;
    endDate: string;
    location: { destination: string };
}

const TripsSlider: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const loggedInUserId = useSelector((state: RootState) => state.auth.userId);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, tripsResponse] = await Promise.all([,
                    axios.get(`${API_BASE_URL}/api/user-trips`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setTrips(tripsResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users or trips');
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            setError('User is not authenticated.');
            setLoading(false);
        }
    }, [API_BASE_URL, token, isAuthenticated]);

    if (loading) return <Loader />

    if (trips.length === 0) {
        return;
    }

    return (
        <div className="mx-auto px-4">
            <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">
                    {t('myTrips')}
                </span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">
                {t('createTripTitle')}
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {trips.map((trip) => (
                    <TripCard key={trip._id} trip={trip} loggedInUserId={loggedInUserId || ''} />
                ))}
            </div>
        </div>
    );
};

export default TripsSlider;
