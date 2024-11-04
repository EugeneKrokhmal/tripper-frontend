import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Button from '../components/elements/Button';
import MarkerIcon from '../images/icons/marker.svg';
import Loader from '../components/structure/Loader';

const JoinTripPage: React.FC = () => {
    const { tripId, token } = useParams<{ tripId: string; token: string }>();
    const [trip, setTrip] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const tokenState = useSelector((state: RootState) => state.auth.token);  // User's auth token from redux state
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // Fetch the trip details using the join token
    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/trips/${tripId}/${token}`);
                setTrip(response.data);
            } catch (err) {
                setError('Failed to fetch trip details');
            }
        };

        fetchTripDetails();
    }, [API_BASE_URL, tripId, token]);

    const handleJoinTrip = async () => {
        try {
            if (!tokenState) {
                // Redirect to login page with a redirect query parameter to come back to the join page
                navigate(`/login?redirect=/join/${tripId}/${token}`);
            } else {
                // Make request to join the trip
                await axios.post(
                    `${API_BASE_URL}/api/join/${tripId}/${token}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${tokenState}` },
                    }
                );
                // After successfully joining, redirect to trip details page
                navigate(`/trip/${tripId}`);
            }
        } catch (err) {
            setError('Failed to join the trip');
        }
    };

    // Format the dates to 'day month' format
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (!trip) {
        return (
            <div className="pb-20 h-screen flex tems-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className="bg-white dark:bg-zinc-800 pt-8 flex flex-col">
                <div className="relative w-full max-w-screen-xl mx-auto px-4">
                    <img
                        className="object-cover rounded h-64 w-full mb-4"
                        src={`${API_BASE_URL}/${trip.image}`}
                        alt={`${trip.location.destination}`}
                    />

                </div>
                <div className="max-w-screen-xl px-4 mx-auto lg:py-16">
                    {/* Right: Login Form */}

                    <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-gradient">{trip.name}</span></h1>
                    <p className="text-zinc-800 text-s font-medium inline-flex items-center me-2 dark:text-zinc-400 mb-2">
                        <img width="16" src={MarkerIcon} alt="{trip.location.destination}" className="mr-2" /><span>{trip.location.destination}</span>
                    </p>
                    <p className="text-sm mb-6 text-zinc-500 dark:text-zinc-300 whitespace-pre-line">
                        {trip.description}
                    </p>

                    <div className="flex mb-6">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300  ring-1 ring-zinc-900/10">
                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)} <span className="font-semibold text-zinc-600 dark:text-zinc-300 "></span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="self-start">
                            <Button label="Join Trip" onClick={handleJoinTrip} variant="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JoinTripPage;
