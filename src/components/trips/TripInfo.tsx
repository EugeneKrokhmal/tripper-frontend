import React from 'react';
import { useTranslation } from 'react-i18next';
import TripMap from './TripMap';
import WeatherWidget from '../widgets/WeatherWidget';
import { formatDate } from '../../utils/dateUtils';

interface TripInfoProps {
    tripName: string;
    tripDescription: string;
    startDate: string;
    endDate: string;
    tripDuration: number;
    isOwner: boolean;
    participants: { _id: string; name: string, profilePhoto: string  }[];
    joinLink: string | null;
    onGenerateJoinLink: () => void;
    loadingJoinLink: boolean;
    error: string | null;
}

const TripInfo: React.FC<TripInfoProps> = ({
    tripName,
    tripDescription,
    startDate,
    endDate,
    tripDuration,
    error
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col">
            <div>
                <h1 className="mb-4 text-5xl font-extrabold text-zinc-900 dark:text-white md:text-6xl">
                    <span className="text-gradient">
                        {tripName}
                    </span>
                </h1>

                <div className="flex mb-4">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300  ring-1 dark:ring-zinc-500 ring-zinc-900/10">
                        {formatDate(startDate)} - {formatDate(endDate)}
                        <span> - </span>
                        <span className="font-semibold text-zinc-600 dark:text-zinc-300 ">
                            ({tripDuration === 0 ? 1 : tripDuration} {tripDuration === 0 ? t('tripDurationDay') : t('tripDurationDays')})
                        </span>
                    </div>
                </div>

                <p className="text text-zinc-500 dark:text-zinc-300 mb-6 whitespace-pre-line">{tripDescription}</p>
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default TripInfo;
