import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserIcon from '../elements/UserIcon';
import Button from '../elements/Button';

import type { TripCardProps } from '../../index';
import { Link } from 'react-router-dom';

const TripCard: React.FC<TripCardProps> = ({ trip, loggedInUserId }) => {
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { t } = useTranslation();

    const imageUrl = trip.image
        ? `${API_BASE_URL}/${trip.image}` : `https://ui-avatars.com/api/?name=${trip.name}&background=random`;

    return (
        <div
            key={trip._id}
            className={`overflow-hidden h-full transition-all transition-500 justify-end mb-4 flex items-center bg-white border border-zinc-200 dark:border-zinc-900 rounded-lg shadow md:flex-col-reverse flex-col-reverse hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700`}
        >
            <div className="w-full flex-col flex px-2 pb-4 md:px-4 leading-normal bg-white dark:bg-zinc-900 h-2/3">
                <h1 className="mb-2 mt-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-3xl">
                    <span
                        onClick={() => navigate(`/trip/${trip._id}`)}
                        className="text-gradient cursor-pointer">
                        {trip.name}
                    </span>
                </h1>
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <p className="font-normal text-xs text-zinc-500 dark:text-zinc-300  dark:text-zinc-400">
                            {trip.creator._id === loggedInUserId ? t('youAreTheOwnerOfTheTrip') : t('YouAreAParticipant')}
                        </p>
                        <p className="mb-4">
                            <span className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">{new Date(trip.startDate).toLocaleDateString()} - </span>
                            <span className="mb-4 text-sm text-zinc-700 dark:text-zinc-400">{new Date(trip.endDate).toLocaleDateString()}</span>
                        </p>
                    </div>
                    <div className="flex justify-between mt-auto items-end">
                        <div className="flex -space-x-4 rtl:space-x-reverse self-end">
                            {trip.participants.slice(0, 3).map((participant) => (
                                <UserIcon
                                    userName={participant.name}
                                    userId={participant._id}
                                    profilePhoto={participant.profilePhoto}
                                    size={'md'}
                                    key={participant._id}
                                    border={'border-2 border-white dark:border-zinc-800'}
                                />
                            ))}
                            {trip.participants.length > 3 && (
                                <span className="z-10 flex items-center justify-center md:w-12 md:h-12 w-10 h-10 text-xs font-medium text-white bg-zinc-700 border-2 border-white rounded-full dark:border-zinc-800">
                                    +{trip.participants.length - 3}
                                </span>
                            )}
                        </div>
                        <div className="flex">
                            <Button
                                label={t('View')}
                                onClick={() => navigate(`/trip/${trip._id}`)}
                                variant="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Link className="min-h-32 max-h-32 w-full h-full" to={`/trip/${trip._id}`} >
                <img
                    className="object-cover rounded-t h-full w-full"
                    src={imageUrl}
                    alt={`${trip.location.destination}`}
                />
            </Link>
        </div>
    );
};

export default TripCard;
