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
    const { t } = useTranslation(); // Using translation hook
    const [showUsersTable, setShowUsersTable] = useState<boolean>(false); // Track if the table is visible

    const toggleUsersTable = () => {
        setShowUsersTable((prevShow) => !prevShow); // Toggle the visibility
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col">
                <h3 id="thecrew" className="mb-2 text-4xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        {t('theCrew')}
                    </span>
                </h3>

                {isOwner && (
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">{t('youAreTheOwnerOfTheTrip')}</p>
                )}

                {/* Avatar Display */}
                <div className="flex -space-x-4 rtl:space-x-reverse mb-6">
                    {participants.slice(0, 3).map((participant) => (
                        <img
                            key={participant._id}
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                            src={`https://ui-avatars.com/api/?name=${participant.name}&background=random`}
                            alt={participant.name}
                        />
                    ))}
                    {participants.length > 3 && (
                        <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                            +{participants.length - 3}
                        </span>
                    )}
                </div>

                {/* Toggle Button */}
                <div className="self-start">
                    <Button
                        onClick={toggleUsersTable}
                        label={showUsersTable ? t('showLess') : t('showMore')}
                        variant={'primary'}
                    >
                    </Button>
                </div>
            </div>

            {/* Conditionally render the UsersTable */}
            {showUsersTable && (
                <>
                    <UsersTable isOwner={isOwner} participants={participants} expenses={expenses} />

                    {/* Toggle Button */}
                    <div className="self-start">
                        <Button
                            onClick={toggleUsersTable}
                            label={t('showLess')}
                            variant={'primary'}
                        >
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TripParticipants;
