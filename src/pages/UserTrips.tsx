import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TripCard from '../components/trips/TripCard';
import TripSearchAndFilter from '../components/trips/TripSearchAndFilter';
import Ad from '../components/structure/Ad';
import Breadcrumbs from '../components/structure/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Loader from '../components/structure/Loader';
import { useNavigate, useLocation } from 'react-router-dom';
import TripsSlider from '../components/trips/TripsSlider';

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

const Dashboard: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const token = useSelector((state: RootState) => state.auth.token);
    const loggedInUserId = useSelector((state: RootState) => state.auth.userId);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users or trips');
                setLoading(false);
                navigate('/')
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            setError('User is not authenticated.');
            setLoading(false);
        }
    }, [API_BASE_URL, token, isAuthenticated]);

    const handleSearch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = trips.filter((trip) =>
            trip.name.toLowerCase().includes(lowerCaseQuery) ||
            trip.location.destination.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredTrips(filtered);
    };

    const handleFilter = (filters: string[]) => {
        setFilteredTrips(trips);
    };

    const breadcrumbs = [
        { label: t('home'), href: '#/' },
        { label: t('myTrips'), href: '/dashboard' }
    ];

    if (loading) {
        return (
            <div className="pb-20 h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container max-w-7xl mx-auto mt-8">
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className="px-4 pt-16">
                <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-gradient">{t('myTrips')}</span>
                </h1>
                <TripSearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
            </div>       

            <div className="flex flex-col-reverse gap-8 md:flex-row-reverse mb-8 px-4">
                <div className="self-start md:sticky top-28 w-full md:w-2/4 xl:w-1/4">
                    <Ad />
                </div>

                <div className="md:w-3/4 content-start grid lg:grid-cols-2 gap-4 px-0">
                    {filteredTrips.length === 0 ? (
                        <p>{t('noTrips')}</p>
                    ) : (
                        filteredTrips.map((trip) => (
                            <TripCard isActive={true} key={trip._id} trip={trip} loggedInUserId={loggedInUserId || ''} />
                        ))
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
