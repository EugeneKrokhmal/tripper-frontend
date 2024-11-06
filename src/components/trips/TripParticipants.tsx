import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UsersTable from '../users/UsersTable';
import Button from '../elements/Button';

interface TripParticipantsProps {
    tripId: string;
    isOwner: boolean;
    participants: { _id: string; name: string }[];
    expenses: {
        _id: string;
        expenseName: string;
        amount: number;
        responsibleUserId: string;
        splitParticipants: string[];
    }[];
}

const TripParticipants: React.FC<TripParticipantsProps> = ({
    tripId,
    isOwner,
    participants,
    expenses,
}) => {
    const { t } = useTranslation();
    const [showUsersTable, setShowUsersTable] = useState<boolean>(true);

    const toggleUsersTable = () => {
        setShowUsersTable((prevShow) => !prevShow);
    };

    return (
        <div className="flex-col gap-8 hidden md:flex">
            <div className="flex flex-col">
                <h3 id="thecrew" className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                    <span className="text-gradient">
                        {t('theCrew')}
                    </span>
                </h3>

                {isOwner && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">{t('youAreTheOwnerOfTheTrip')}</p>
                )}

                <div className="flex -space-x-4 rtl:space-x-reverse">
                    {participants.slice(0, 3).map((participant) => (
                        <img
                            key={participant._id}
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-zinc-800"
                            src={`https://ui-avatars.com/api/?name=${participant.name}&background=random`}
                            alt={participant.name}
                        />
                    ))}
                    {participants.length > 3 && (
                        <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-zinc-700 border-2 border-white rounded-full hover:bg-zinc-600 dark:border-zinc-800">
                            +{participants.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {showUsersTable && (
                <>
                    <UsersTable isOwner={isOwner} participants={participants} expenses={expenses} />

                    <div className="self-start">
                        <Button
                            onClick={toggleUsersTable}
                            label={showUsersTable ? t('showLess') : t('showMore')}
                            variant={'primary'}
                        >
                        </Button>
                    </div>
                </>
            )}

            <hr className="my-8" />
        </div>
    );
};

export default TripParticipants;
