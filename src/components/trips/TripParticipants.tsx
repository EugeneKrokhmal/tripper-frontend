import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isAdmin } from '../../services/usersService';
import UsersTable from '../users/UsersTable';
import Button from '../elements/Button';
import UserIcon from '../elements/UserIcon';
import Modal from '../elements/Modal';

import type { TripParticipantsProps } from '../../index';

const TripParticipants: React.FC<TripParticipantsProps> = ({
    trip,
    userId,
    isOwner,
    admins,
    participants,
    expenses,
}) => {
    const { t } = useTranslation();
    const [isParticipantsModalOpen, setIsAddExpenseModalOpen] = useState(false);

    return (
        <div className="flex-col flex gap-4" onClick={() => { setIsAddExpenseModalOpen(true) }}>
            <div className="flex flex-col">
                <h3 id="thecrew" className="mb-2 text-2xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                    <span className="text-gradient">
                        {t('theCrew')}
                    </span>
                </h3>

                {isOwner && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">{t('youAreTheOwnerOfTheTrip')}</p>
                )}

                {(admins.some(admin => admin._id === userId)) && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">{t('youAreAnAdminOfTheTrip')}</p>
                )}

                <div className="flex -space-x-4 rtl:space-x-reverse">
                    {participants.slice(0, 10).map((participant) => (
                        <UserIcon
                            isAdmin={isAdmin(trip, participant._id)}
                            key={participant._id}
                            userName={participant.name}
                            userId={participant._id}
                            profilePhoto={participant.profilePhoto}
                            size={'md'}
                            border={'border-2 border-white dark:border-zinc-800'}
                        />
                    ))}
                    {participants.length > 10 && (
                        <span className="z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-xs font-medium text-white bg-zinc-700 border-2 border-white rounded-full hover:bg-zinc-600 dark:border-zinc-800">
                            +{participants.length - 10}
                        </span>
                    )}
                </div>
                <div className="flex">
                    <div className="self-start py-4">
                        <Button
                            label={t('showMore')}
                            variant={'primary'}
                        />
                    </div>
                </div>
            </div>

            {isParticipantsModalOpen && (
                <Modal onClose={() => {
                    setIsAddExpenseModalOpen(false)
                }}>
                    <div className="max-h-[80vh] overflow-y-auto w-full">
                        <UsersTable
                            trip={trip}
                            isOwner={isOwner}
                            admins={admins || []}
                            participants={participants || []}
                            expenses={expenses} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TripParticipants;
