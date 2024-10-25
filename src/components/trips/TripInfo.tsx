import React from 'react';
import { useTranslation } from 'react-i18next';
import TripMap from './TripMap';
import WeatherWidget from '../widgets/WeatherWidget';

interface TripInfoProps {
    tripName: string;
    tripDescription: string;
    destination: string;
    startDate: string;
    endDate: string;
    tripDuration: number;
    isOwner: boolean;
    participants: { _id: string; name: string }[];
    joinLink: string | null;
    onGenerateJoinLink: () => void;
    loadingJoinLink: boolean;
    error: string | null;
    coordinates: { lat: number; lng: number };
}

const TripInfo: React.FC<TripInfoProps> = ({
    tripName,
    tripDescription,
    destination,
    startDate,
    endDate,
    tripDuration,
    error,
    coordinates,
}) => {
    const { t } = useTranslation();

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
        }).format(date);
    };

    return (
        <div className="flex flex-col">
            <div>
                <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        {tripName}
                    </span>
                </h1>

                <div className="flex mb-4">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300  ring-1 dark:ring-gray-500 ring-gray-900/10">
                        {formatDate(startDate)} - {formatDate(endDate)}
                        <span> - </span>
                        <span className="font-semibold text-gray-600 dark:text-gray-300 ">
                            ({tripDuration} {tripDuration === 1 ? t('tripDurationDay') : t('tripDurationDays')})
                        </span>
                    </div>
                </div>

                <p className="text text-gray-500 dark:text-gray-300 mb-6">{tripDescription}</p>

                <h3 id="theplace" className="mb-2 text-4xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('thePlace')}</span>
                </h3>
                <p className="text-sm mb-6 text-gray-500 dark:text-gray-300">
                    {t('discoverAmazingTrip')} <strong>{destination}.</strong>
                </p>

                <TripMap coordinates={coordinates} />

                <WeatherWidget latitude={coordinates.lat} longitude={coordinates.lng} />
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default TripInfo;
