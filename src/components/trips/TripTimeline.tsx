import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import InputField from '../elements/InputField';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import Modal from '../elements/Modal';
import EditIcon from '../../images/icons/edit.svg';
import DeleteIcon from '../../images/icons/delete.svg';
import TripMap from './TripMap';
import LocationIcon from '../../images/icons/marker.svg';
import BookingIcon from '../../images/icons/bed.svg';


interface TripTimelineProps {
    isOwner: boolean;
    startDate: string;
    endDate: string;
    tripId: string;
    token: string;
    API_BASE_URL: string;
    OPEN_CAGE_API_KEY: string;
}

interface Activity {
    name: string;
    description: string;
    time: string;
    bookingLink?: string;
    transportation?: { title: string; lat?: number; lng?: number };
}

const DEBOUNCE_DELAY = 300;

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

const TripTimeline: React.FC<TripTimelineProps> = ({
    startDate,
    endDate,
    tripId,
    token,
    API_BASE_URL,
    OPEN_CAGE_API_KEY,
    isOwner,
}) => {
    const { t } = useTranslation();

    const [timeline, setTimeline] = useState<{ [key: string]: Activity[] }>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [newActivity, setNewActivity] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newTime, setNewTime] = useState<string>('');
    const [newBookingLink, setNewBookingLink] = useState<string>('');
    const [newTransportation, setNewTransportation] = useState<{ title: string; lat?: number; lng?: number } | null>(null);
    const [newTransportationTitle, setNewTransportationTitle] = useState<string>('');
    const [newLat, setNewLat] = useState<number | null>(null);
    const [newLng, setNewLng] = useState<number | null>(null);
    const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editActivityIndex, setEditActivityIndex] = useState<number | null>(null);

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

    const debounce = (func: Function, delay: number) => {
        let debounceTimer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const fetchAutocompleteResults = async (query: string) => {
        if (query.length < 3) return;
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPEN_CAGE_API_KEY}&limit=5`
            );
            setAutocompleteResults(response.data.results);
        } catch (err) {
            console.error('Error fetching location suggestions', err);
        }
    };

    const debouncedFetchAutocomplete = debounce(fetchAutocompleteResults, DEBOUNCE_DELAY);

    const handleLocationChange = (value: string) => {
        setNewTransportationTitle(value);
        if (value.length >= 3) {
            debouncedFetchAutocomplete(value);
        } else {
            setAutocompleteResults([]);
        }
    };

    const handleSelectSuggestion = (suggestion: any) => {
        setNewTransportationTitle(suggestion.formatted);
        setNewLat(suggestion.geometry.lat);
        setNewLng(suggestion.geometry.lng);
        setAutocompleteResults([]);
    };

    const handleAddOrUpdateActivity = async () => {
        if (!selectedDate || !newActivity || !newDescription || !newTime) return;

        const newActivityObject: Activity = {
            name: newActivity,
            description: newDescription,
            time: newTime,
            bookingLink: newBookingLink,
            transportation: newTransportationTitle
                ? {
                    title: newTransportationTitle,
                    lat: newLat !== null ? newLat : undefined,
                    lng: newLng !== null ? newLng : undefined
                }
                : undefined,
        };


        const updatedTimeline = { ...timeline };

        if (editMode && editActivityIndex !== null) {
            updatedTimeline[selectedDate][editActivityIndex] = newActivityObject;
        } else {
            updatedTimeline[selectedDate] = [...(updatedTimeline[selectedDate] || []), newActivityObject];
        }

        try {
            await axios.put(
                `${API_BASE_URL}/api/trips/${tripId}/timeline`,
                { timeline: updatedTimeline },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTimeline(updatedTimeline);
            closeModal();
        } catch (error) {
            console.error("Error updating timeline:", error);
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
        setNewBookingLink('');
        setNewTransportationTitle('');
        setNewLat(null);
        setNewLng(null);
        setNewTransportation(null);
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
        setNewBookingLink(activity.bookingLink || '');
        setNewTransportation(activity.transportation || null);
        setEditMode(true);
        setEditActivityIndex(index);
        setModalVisible(true);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
        }).format(date);
    };

    const tripDates = getAllTripDates(startDate, endDate);
    const displayedDates = showAll ? tripDates : tripDates.slice(-3);

    return (
        <div className="trip-timeline">
            <h3 id="timeline" className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                <span className="text-gradient">{t('timeline')}</span>
            </h3>

            <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">{t('toAddActivity')}</p>

            <ol className="relative border-l border-zinc-200 dark:border-zinc-700 my-6 pb-6">
                {displayedDates.map(date => (
                    <li key={date} className="mb-1 ml-4">
                        <div className="absolute w-3 h-3 bg-zinc-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-zinc-900 dark:bg-zinc-700"></div>
                        <time className="mb-1 text-normal font-normal leading-none text-zinc-400 dark:text-zinc-300"><span className="text-gradient font-bold">{formatDate(date)}</span> {t('dayPlan')}:</time>
                        {timeline[date] && timeline[date].length > 0 ? (
                            <ul className="mb-4 mt-4 text-base font-normal text-zinc-500 dark:text-zinc-300">
                                {timeline[date].map((activity, index) => (
                                    <li key={index} className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex gap-4 w-10/12">
                                                <strong className="w-10">{activity.time}</strong>
                                                <div>
                                                    <strong>{activity.name}</strong>:
                                                    <div className="mb-2">{activity.description}</div>
                                                    {activity.bookingLink && (
                                                        <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer" className="flex text-gradient underline">
                                                            <img src={BookingIcon} alt="Location" className="inline-block w-4 h-4 mr-2" />
                                                            {t('viewBooking')}
                                                        </a>
                                                    )}
                                                    {activity.transportation && (
                                                        <div className="mt-2">
                                                            <a className="flex underline text-gradient" target="_blank" href={`https://maps.google.com/?q=${activity.transportation.lat},${activity.transportation.lng}`}>
                                                                <img src={LocationIcon} alt="Location" className="inline-block w-4 h-4 mr-2" />
                                                                {activity.transportation.title}
                                                            </a>
                                                        </div>
                                                    )}
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
                            <p className="text-base font-normal text-zinc-500 dark:text-zinc-300">{t('noActivities')}</p>
                        )}
                    </li>
                ))}
            </ol>

            <div className="flex flex-row text-center mt-4 gap-2">
                {isOwner && (
                    <div className="self-start">
<Button label={t('addActivity')} onClick={() => setModalVisible(true)} variant="primary" />                        
                    </div>
                )}
                {tripDates.length > 3 && (
                    <Button label={showAll ? t('showLess') : t('showMore')} onClick={() => setShowAll(!showAll)} variant="secondary" />
                )}
            </div>

            {modalVisible && isOwner && (
                <Modal onClose={closeModal}>
                    <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                        <span className="text-gradient">{editMode ? t('editActivity') : t('addActivity')}</span>
                    </h3>

                    <form className="max-h-[70vh] overflow-y-auto">
                        <div className="mb-4">
                            <label htmlFor="date-select" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">{t('selectDate')}<span className="text-red-500">*</span> </label>
                            <select
                                id="date-select"
                                value={selectedDate || ''}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="block w-full p-2.5 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                            >
                                <option value="" disabled>{t('selectDate')}</option>
                                {tripDates.map(date => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                        </div>
                        <InputField type="text" value={newActivity} onChange={(e) => setNewActivity(e.target.value)} label={t('enterActivityName')} required />
                        <TextArea label={t('activityDescription')} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                        <InputField label={t('activityTime')} type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} required />
                        <InputField label={t('bookingLink')} type="url" value={newBookingLink} onChange={(e) => setNewBookingLink(e.target.value)} />

                        <InputField
                            label={t('location')}
                            type="text"
                            value={newTransportationTitle}
                            onChange={(e) => handleLocationChange(e.target.value)}
                        />
                        {autocompleteResults.length > 0 && (
                            <ul className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                {autocompleteResults.map((result, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleSelectSuggestion(result)}
                                    >
                                        {result.formatted}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Button label={editMode ? t('updateActivity') : t('addActivity')} onClick={handleAddOrUpdateActivity} variant="primary" />
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default TripTimeline;
