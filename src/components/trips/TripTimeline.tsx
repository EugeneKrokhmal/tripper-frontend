import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import axios from 'axios';
import InputField from '../elements/InputField';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import Modal from '../elements/Modal';
import EditIcon from '../../images/icons/edit.svg';
import DeleteIcon from '../../images/icons/delete.svg';

interface TripTimelineProps {
    isOwner: boolean;
    startDate: string;
    endDate: string;
    tripId: string;
    token: string;
    API_BASE_URL: string;
}

interface Activity {
    name: string;
    description: string;
    time: string;
}

const TripTimeline: React.FC<TripTimelineProps> = ({
    startDate,
    endDate,
    tripId,
    token,
    API_BASE_URL,
    isOwner,
}) => {
    const { t } = useTranslation();  // Initialize the translation hook

    const [timeline, setTimeline] = useState<{ [key: string]: Activity[] }>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [newActivity, setNewActivity] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newTime, setNewTime] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editActivityIndex, setEditActivityIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
        }).format(date);
    };

    const getAllTripDates = (start: string, end: string): string[] => {
        const dates = [];
        let currentDate = new Date(start);
        const endDate = new Date(end);

        while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/trips/${tripId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTimeline(response.data.timeline || {});
            } catch (error) {
                console.error('Error fetching trip details:', error);
            }
        };

        fetchTripDetails();
    }, [tripId, token]);

    const handleAddOrUpdateActivity = async () => {
        if (!selectedDate || !newActivity || !newDescription || !newTime) return;

        const newActivityObject = {
            name: newActivity,
            description: newDescription,
            time: newTime,
        };

        const updatedTimeline = { ...timeline };

        if (editMode && editActivityIndex !== null) {
            updatedTimeline[selectedDate][editActivityIndex] = newActivityObject;
        } else {
            updatedTimeline[selectedDate] = [...(updatedTimeline[selectedDate] || []), newActivityObject];
        }

        try {
            await axios.put(`${API_BASE_URL}/api/trips/${tripId}/timeline`, { timeline: updatedTimeline }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTimeline(updatedTimeline);
            closeModal();
        } catch (error) {
            console.error('Error updating timeline:', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        resetForm();
    };

    const resetForm = () => {
        setNewActivity('');
        setNewDescription('');
        setNewTime('');
        setSelectedDate(null);
        setEditMode(false);
        setEditActivityIndex(null);
    };

    const handleDeleteActivity = async (date: string, index: number) => {
        const updatedTimeline = { ...timeline };
        updatedTimeline[date].splice(index, 1);

        try {
            await axios.put(`${API_BASE_URL}/api/trips/${tripId}/timeline`, { timeline: updatedTimeline }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTimeline(updatedTimeline);
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    const handleEditActivity = (date: string, activity: Activity, index: number) => {
        setSelectedDate(date);
        setNewActivity(activity.name);
        setNewDescription(activity.description);
        setNewTime(activity.time);
        setEditMode(true);
        setEditActivityIndex(index);
        setModalVisible(true);
    };

    const tripDates = getAllTripDates(startDate, endDate);
    const displayedDates = showAll ? tripDates : tripDates.slice(-3);

    return (
        <div className="trip-timeline">
            <h3 id="timeline" className="mb-2 text-4xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('timeline')}</span>
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-300  mb-6">{t('toAddActivity')}</p>

            <ol className="relative border-l border-gray-200 dark:border-gray-700 my-6 pb-6">
                {displayedDates.map(date => (
                    <li key={date} className="mb-1 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-300">{formatDate(date)} {t('dayPlan')}:</time>
                        {timeline[date] && timeline[date].length > 0 ? (
                            <ul className="mb-4 mt-4 text-base font-normal text-gray-500 dark:text-gray-300">
                                {timeline[date].map((activity, index) => (
                                    <li key={index} className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex gap-4 w-10/12">
                                                <strong className="w-10">{activity.time}</strong>
                                                <div>
                                                    <strong>{activity.name}</strong>:
                                                    <div>{activity.description}</div>
                                                </div>
                                            </div>
                                            {isOwner && (
                                                <div className="w-2/12 flex space-x-2 mt-1 justify-end cursor-pointer">
                                                    <a onClick={() => handleEditActivity(date, activity, index)}>
                                                        <img src={EditIcon} alt={t('editActivity')} />
                                                    </a>
                                                    <a onClick={() => handleDeleteActivity(date, index)}>
                                                        <img src={DeleteIcon} alt="Delete" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-base font-normal text-gray-500 dark:text-gray-300">{t('noActivities')}</p>
                        )}
                    </li>
                ))}
            </ol>

            <div className="flex flex-row text-center mt-4 flex gap-2">

                {isOwner && (
                    <div className="self-start">
                        <Button label={t('addActivity')} onClick={() => setModalVisible(true)} variant="primary" />
                    </div>
                )}
                {tripDates.length > 3 && (
                    <div className="self-start">


                        <Button
                            label={showAll ? t('showLess') : t('showMore')}
                            onClick={() => setShowAll(!showAll)}
                            variant="secondary"
                        />
                    </div>
                )}

            </div>

            {modalVisible && isOwner && (
                <Modal onClose={closeModal}>
                    <h3 className="mb-2 text-4xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{editMode ? t('editActivity') : t('addActivity')}</span>
                    </h3>

                    <form className="max-h-[70vh] overflow-y-auto">

                        <div className="mb-4">
                            <label htmlFor="date-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('selectDate')}</label>
                            <select
                                id="date-select"
                                value={selectedDate || ''}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="" disabled>{t('selectDate')}</option>
                                {tripDates.map(date => (
                                    <option key={date} value={date}>{formatDate(date)}</option>
                                ))}
                            </select>
                        </div>

                        <InputField
                            label={t('activityName')}
                            type="text"
                            value={newActivity}
                            onChange={(e) => setNewActivity(e.target.value)}
                            placeholder={t('enterActivityName')}
                        />

                        <TextArea
                            label={t('activityDescription')}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder={t('enterActivityDescription')}
                        />

                        <InputField
                            label={t('activityTime')}
                            type="time"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            placeholder={t('enterActivityTime')}
                        />

                        <Button label={editMode ? t('updateActivity') : t('addActivity')} onClick={handleAddOrUpdateActivity} variant="primary" />
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default TripTimeline;
