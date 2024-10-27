import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputField from '../elements/InputField';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import DateRangePicker from '../elements/DateRangePicker';

const CreateTrip: React.FC = () => {
    const { t } = useTranslation();
    const [tripName, setTripName] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const OPEN_CAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

    // Debounce function to prevent rapid API requests
    const debounce = (func: Function, delay: number) => {
        let debounceTimer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Fetch location suggestions from OpenCage API
    const fetchAutocompleteResults = async (query: string) => {
        try {
            if (query.length < 3) return;

            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPEN_CAGE_API_KEY}&limit=5`
            );

            setAutocompleteResults(response.data.results);
        } catch (err) {
            console.error('Error fetching location suggestions', err);
        }
    };

    // Debounced autocomplete function
    const debouncedFetchAutocomplete = debounce(fetchAutocompleteResults, 300);

    // Handle location input changes with debouncing
    const handleLocationChange = (value: string) => {
        setDestination(value);
        debouncedFetchAutocomplete(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (startDate > endDate) {
            setError(t('endDateError'));
            return;
        }

        try {
            const locationResponse = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${OPEN_CAGE_API_KEY}&q=${encodeURIComponent(destination)}&pretty=1&no_annotations=1`
            );

            if (locationResponse.data.results.length === 0) {
                setError(t('locationNotFound'));
                return;
            }

            const locationData = locationResponse.data.results[0].geometry;

            const createTripResponse = await axios.post(
                `${API_BASE_URL}/api/trips`,
                {
                    name: tripName,
                    description,
                    destination,
                    coordinates: {
                        lat: locationData.lat,
                        lng: locationData.lng,
                    },
                    startDate,
                    endDate,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccess(t('tripCreated'));
            setTripName('');
            setDestination('');
            setStartDate('');
            setEndDate('');

            const newTripId = createTripResponse.data._id;
            navigate(`/trip/${newTripId}`);
        } catch (err) {
            console.error('Error creating trip:', err);
            setError(t('createTripError'));
        }
    };

    const handleAutocompleteSelect = (result: any) => {
        setDestination(result.formatted);
        setAutocompleteResults([]);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('createTripTitle')}</span>
            </h3>
            <form onSubmit={handleSubmit}>
                <InputField
                    label={t('tripName')}
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    required
                />

                <div className="relative">
                    <InputField
                        label={t('destination')}
                        type="text"
                        value={destination}
                        onChange={(e) => handleLocationChange(e.target.value)}
                        required
                    />

                    {/* Autocomplete suggestions */}
                    {autocompleteResults.length > 0 && (
                        <ul className="absolute top-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {autocompleteResults.map((result, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleAutocompleteSelect(result)}
                                >
                                    {result.formatted}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={(e) => setStartDate(e.target.value)}
                    onEndDateChange={(e) => setEndDate(e.target.value)}
                    required
                />

                <TextArea
                    label={t('description')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <div className="flex">
                    <Button label={t('createTrip')} type="submit" variant="primary" />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>
        </div>
    );
};

export default CreateTrip;
