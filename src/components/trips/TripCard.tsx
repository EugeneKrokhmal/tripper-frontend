import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../elements/Button';
import { useTranslation } from 'react-i18next';

interface TripCardProps {
    trip: {
        _id: string;
        name: string;
        creator: { _id: string; name: string; email: string };
        participants: { _id: string; name: string; email: string }[];
        location: { destination: string };
        startDate: string;
        endDate: string;
        image?: string; // Optional trip image URL (can be null if not set)
    };
    loggedInUserId: string;
}

const TripCard: React.FC<TripCardProps> = ({ trip, loggedInUserId }) => {
    const [cityImage, setCityImage] = useState<string>('');
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const { t } = useTranslation();


    useEffect(() => {
        const fetchCityImage = async () => {
            if (!UNSPLASH_ACCESS_KEY) {
                console.error('Unsplash Access Key is missing.');
                return;
            }

            try {
                const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                    params: {
                        query: `${trip.location.destination}`,
                        client_id: UNSPLASH_ACCESS_KEY,
                        per_page: 1,
                    },
                });

                if (response.data.results.length > 0) {
                    setCityImage(response.data.results[0].urls.small);
                } else {
                    console.log('No images found for the destination.');
                }
            } catch (error) {
                console.error('Error fetching city image:', error);
            }
        };

        // If no trip image, load from Unsplash
        if (!trip.image && trip.location.destination) {
            fetchCityImage();
        }
    }, [trip.location.destination, UNSPLASH_ACCESS_KEY, trip.image]);

    const imageUrl = trip.image
        ? `${API_BASE_URL}/${trip.image}`
        : cityImage || `https://ui-avatars.com/api/?name=${trip.name}&background=random`;

    return (
        <a
            onClick={() => navigate(`/trip/${trip._id}`)}
            className="cursor-pointer justify-end mb-4 flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col-reverse flex-col-reverse hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <div className="w-full h-full flex-col flex px-4 md:px-4 px-4 leading-normal">
                <h1 className="mb-2 mt-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{trip.name}</span>
                </h1>
                <div className="w-full h-full flex flex-col">
                    <div>
                        <p className="font-normal text-xs text-gray-500 dark:text-gray-300  dark:text-gray-400">
                            {trip.creator._id === loggedInUserId ? t('youAreTheOwnerOfTheTrip') : t('YouAreAParticipant')}
                        </p>
                        <p className="mb-4">
                            <span className="mt-2 text-sm text-gray-700 dark:text-gray-400">{new Date(trip.startDate).toLocaleDateString()}</span>
                            <span> - </span>
                            <span className="mb-4 text-sm text-gray-700 dark:text-gray-400">{new Date(trip.endDate).toLocaleDateString()}</span>
                        </p>
                    </div>
                    <div className="flex justify-between mt-auto">
                        <div className="flex w-full -space-x-4 rtl:space-x-reverse mb-4 self-end">
                            {trip.participants.slice(0, 3).map((participant) => (
                                <img
                                    key={participant._id}
                                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                    src={`https://ui-avatars.com/api/?name=${participant.name}&background=random`}
                                    alt={participant.name}
                                />
                            ))}
                            {trip.participants.length > 3 && (
                                <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                                    +{trip.participants.length - 3}
                                </span>
                            )}
                        </div>
                        <Button
                            label={t('View')}
                            onClick={() => navigate(`/trip/${trip._id}`)}
                            variant="primary"
                        />
                    </div>
                </div>
            </div>
            <img
                className="object-cover rounded-t h-32 w-full"
                src={imageUrl}
                alt={`${trip.location.destination}`}
            />
        </a>
    );
};

export default TripCard;
