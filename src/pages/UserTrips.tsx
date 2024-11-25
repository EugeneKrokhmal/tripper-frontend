import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import TripCard from '../components/trips/TripCard';
import TripSearchAndFilter from '../components/trips/TripSearchAndFilter';
import Ad from '../components/structure/Ad';
import { useTranslation } from 'react-i18next';
import Loader from '../components/structure/Loader';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import type { User, Trip } from '../index';

const Dashboard: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const token = useSelector((state: RootState) => state.auth.token);
    const loggedInUserId = useSelector((state: RootState) => state.auth.userId);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
    const [pastTrips, setPastTrips] = useState<Trip[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, tripsResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/users`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${API_BASE_URL}/api/user-trips`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const sortedTrips = tripsResponse.data.sort(
                    (a: Trip, b: Trip) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                );

                setUsers(usersResponse.data);
                setTrips(sortedTrips);
                setFilteredTrips(sortedTrips);

                // Split trips into upcoming and past
                splitTrips(sortedTrips);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users or trips');
                setLoading(false);
                handleLogout();
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            setLoading(false);
            navigate('/login');
        }
    }, [API_BASE_URL, token, isAuthenticated]);

    // Function to split trips into upcoming and past
    const splitTrips = (trips: Trip[]) => {
        const currentDate = new Date();
        const upcoming = trips.filter(trip => new Date(trip.endDate) >= currentDate);
        const past = trips.filter(trip => new Date(trip.endDate) < currentDate);

        setUpcomingTrips(upcoming);
        setPastTrips(past);
    };

    const handleSearch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = trips.filter(
            (trip) =>
                trip.name.toLowerCase().includes(lowerCaseQuery) ||
                trip.location.destination.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredTrips(filtered);
        splitTrips(filtered);
    };

    const handleFilter = (filters: string[]) => {
        setFilteredTrips(trips);
        splitTrips(trips);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center pb-20">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container max-w-7xl mx-auto pt-8 pb-16 lg:pt-16 lg:pb-24">
            <h1 className="mb-4 px-4 text-5xl font-extrabold text-zinc-900 dark:text-white md:text-6xl">
                <span className="text-transparent dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">
                    {t('myTrips')}
                </span>
            </h1>

            <div className="flex flex-col-reverse gap-8 md:flex-row-reverse mb-8 px-4">
                <div className="self-start md:sticky top-28 w-full md:w-2/4 xl:w-1/4">
                    <Ad />
                </div>

                <div className="md:w-3/4 content-start px-0">
                    <TripSearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
                    {(upcomingTrips.length > 0) && (
                        <>
                            <h2 className="text-gradient text-2xl font-extrabold mb-4">{t('upcomingTrips')}</h2>
                            <div className="grid lg:grid-cols-2 gap-4 gap-y-8 mb-16">
                                {upcomingTrips.map((trip) => (
                                    <TripCard
                                        key={trip._id}
                                        trip={trip}
                                        isActive={false}
                                        loggedInUserId={loggedInUserId || ''}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {(pastTrips.length > 0) && (
                        <>
                            <h2 className="text-gradient text-2xl font-extrabold mb-4">{t('pastTrips')}</h2>
                            <div className="grid lg:grid-cols-2 gap-4 gap-y-8">
                                {pastTrips.map((trip) => (
                                    <TripCard
                                        key={trip._id}
                                        trip={trip}
                                        isActive={false}
                                        loggedInUserId={loggedInUserId || ''}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
