import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UsersTable from '../users/UsersTable';
import Button from '../elements/Button';
import UserIcon from '../elements/UserIcon';

interface TripParticipantsProps {
    tripId: string;
    userId: string;
    isOwner: boolean;
    admins: [];
    participants: { _id: string; name: string, profilePhoto: string }[];
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
    userId,
    isOwner,
    admins,
    participants,
    expenses,
}) => {
    const { t } = useTranslation();
    const [showUsersTable, setShowUsersTable] = useState<boolean>(true);

    const toggleUsersTable = () => {
        setShowUsersTable((prevShow) => !prevShow);
    };

    return (
        <div className="flex-col flex gap-4">
            <div className="flex flex-col">
                <h3 id="thecrew" className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                    <span className="text-gradient">
                        {t('theCrew')}
                    </span>
                </h3>

                {isOwner && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">{t('youAreTheOwnerOfTheTrip')}</p>
                )}

                {(admins as string[]).includes(userId) && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">{t('youAreAnAdminOfTheTrip')}</p>
                )}

                <div className="flex -space-x-4 rtl:space-x-reverse">
                    {participants.slice(0, 5).map((participant) => (
                        <UserIcon
                            key={participant._id}
                            userName={participant.name}
                            userId={participant._id}
                            profilePhoto={participant.profilePhoto}
                            size={'md'}
                            border={'border-2 border-white dark:border-zinc-800'}
                        />
                    ))}
                    {participants.length > 5 && (
                        <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-xs font-medium text-white bg-zinc-700 border-2 border-white rounded-full hover:bg-zinc-600 dark:border-zinc-800">
                            +{participants.length - 5}
                        </span>
                    )}
                </div>
            </div>

            <div className="hidden md:block">
                {showUsersTable && (
                    <>
                        <UsersTable
                            isOwner={isOwner}
                            admins={admins}
                            participants={participants}
                            expenses={expenses} />
                    </>
                )}

                <div className="self-start pt-8">
                    <Button
                        onClick={toggleUsersTable}
                        label={showUsersTable ? t('showLess') : t('showMore')}
                        variant={'primary'}
                    >
                    </Button>
                </div>
            </div>

            <hr className="my-8" />
        </div>
    );
};

export default TripParticipants;
