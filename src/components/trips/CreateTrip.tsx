import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputField from '../elements/InputField';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import DateRangePicker from '../elements/DateRangePicker';
import CurrencySwitcher from '../CurrencySwitcher';
import { useCurrency } from '../CurrencyContext';
import CreateTripImage1 from '../../images/gallery/9.jpg';
import CreateTripImage2 from '../../images/gallery/10.jpg';
import CreateTripImage3 from '../../images/gallery/11.jpg';

const DEBOUNCE_DELAY = 300;

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
    const [currentStep, setCurrentStep] = useState(1);
    const token = useSelector((state: RootState) => state.auth.token);
    const { currency } = useCurrency();
    const navigate = useNavigate();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const OPEN_CAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

    // Array of images for each step
    const stepImages = [CreateTripImage1, CreateTripImage2, CreateTripImage3];

    // Fade-in state for the image
    const [fadeIn, setFadeIn] = useState(true);

    // Handle image transition on step change
    useEffect(() => {
        setFadeIn(false); // Trigger fade-out
        const fadeTimer = setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after fade-out
        }, 100); // Adjust delay for smoother transition
        return () => clearTimeout(fadeTimer);
    }, [currentStep]);

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
        setDestination(value);
        if (value.length >= 3) {
            debouncedFetchAutocomplete(value);
        } else {
            setAutocompleteResults([]);
        }
    };

    const handleSelectSuggestion = (formatted: string) => {
        setDestination(formatted);
        setAutocompleteResults([]);
    };

    const handleDateChange = (type: 'start' | 'end', value: string) => {
        if (type === 'start') {
            setStartDate(value);
            if (endDate && new Date(value) > new Date(endDate)) {
                setError(t('endDateError'));
            } else {
                setError(null);
            }
        } else {
            setEndDate(value);
            if (startDate && new Date(value) < new Date(startDate)) {
                setError(t('endDateError'));
            } else {
                setError(null);
            }
        }
    };

    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        if (startDate > endDate) {
            setError(t('endDateError'));
            return;
        }

        try {
            const locationResponse = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${OPEN_CAGE_API_KEY}&q=${encodeURIComponent(destination)}`
            );
            const locationData = locationResponse.data.results[0]?.geometry;
            const createTripResponse = await axios.post(
                `${API_BASE_URL}/api/trips`,
                {
                    name: tripName,
                    description,
                    currency,
                    destination,
                    coordinates: locationData,
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
            navigate(`/trip/${createTripResponse.data._id}`);
        } catch (err) {
            console.error('Error creating trip:', err);
            setError(t('createTripError'));
        }
    };

    const handleNext = () => setCurrentStep((prev) => prev + 1);
    const handlePrevious = () => setCurrentStep((prev) => prev - 1);

    const isStepValid = () => {
        if (currentStep === 1) return tripName.trim() !== '';
        if (currentStep === 2) return destination.trim() !== '' && startDate !== '' && endDate !== '' && !error;
        if (currentStep === 3) return description.trim() !== '';
        return false;
    };

    return (
        <>
            <div className="container max-w-7xl mx-auto h-screen flex flex-wrap flex-col md:flex-row px-4 pb-32">
                <ol className="md:h-16 px-2 md:px-4 p-4 md:py-4 bg-white dark:bg-gray-900 rounded my-4 z-10 self-top relative w-full flex justify-space-around md:justify-center text-gray-500 dark:border-gray-700 dark:text-gray-400 md:p-16 py-8">
                    {[
                        { title: t('tripName'), step: 1, icon: 'check' },
                        { title: t('destination'), step: 2, icon: 'check' },
                        { title: t('description'), step: 3, icon: 'check' },
                    ].map((item) => (
                        <li key={item.step} className={`w-1/3 flex-col md:flex-row flex text-center items-center gap-2 text-sm mx-4 ${currentStep === item.step ? 'text-gray-900 dark:text-gray-100' : ''}`}>
                            <span
                                className={`flex items-center justify-center w-4 h-4 md:w-8 md:h-8 ${currentStep >= item.step ? 'bg-gradient-to-r to-emerald-600 from-sky-400' : 'bg-gray-100'} rounded-full -start-2 ring-2 ring-white dark:ring-gray-900 ${currentStep >= item.step ? ' color-white ' : 'dark:bg-gray-700'
                                    }`}
                            >
                                {item.icon === 'check' && currentStep >= item.step && (
                                    <svg className="w-2 h-2 md:w-3.5 md:h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                    </svg>
                                )}
                            </span>
                            <h3 className="text-sm leading-tight">{item.title}</h3>
                        </li>
                    ))}
                </ol>

                <div className="z-10 w-full md:w-2/5 flex self-center flex-col px-4 md:px-4 p-6 md:py-8 bg-white dark:bg-gray-900 rounded">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {currentStep === 1 && (
                            <div>
                                <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('tripName')}</span>
                                </h2>
                                <InputField
                                    label={t('tripName')}
                                    type="text"
                                    value={tripName}
                                    onChange={(e) => setTripName(e.target.value)}
                                    required
                                />
                                <CurrencySwitcher />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="relative">
                                <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('destination')}</span>
                                </h2>
                                <InputField
                                    label={t('destination')}
                                    type="text"
                                    value={destination}
                                    onChange={(e) => handleLocationChange(e.target.value)}
                                    required
                                />

                                {autocompleteResults.length > 0 && (
                                    <ul className="absolute top-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                        {autocompleteResults.map((result, index) => (
                                            <li
                                                key={index}
                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => handleSelectSuggestion(result.formatted)}
                                            >
                                                {result.formatted}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <DateRangePicker
                                    startDate={startDate}
                                    endDate={endDate}
                                    onStartDateChange={(e) => handleDateChange('start', e.target.value)}
                                    onEndDateChange={(e) => handleDateChange('end', e.target.value)}
                                    required
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div>
                                <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('description')}</span>
                                </h2>
                                <TextArea
                                    label={t('description')}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                {success && <p className="text-green-500">{success}</p>}
                            </div>
                        )}

                        <div className="flex mt-4 gap-2">
                            {currentStep > 1 && (
                                <Button label={t('goBack')} type="button" onClick={handlePrevious} variant="secondary" />
                            )}
                            {currentStep < 3 && isStepValid() && (
                                <Button label={t('next')} type="button" onClick={handleNext} variant="primary" />
                            )}
                            {currentStep === 3 && isStepValid() && (
                                <Button label={t('createTrip')} type="button" onClick={handleSubmit} variant="primary" />
                            )}
                        </div>
                    </form>
                </div>

                <div className="z-0 absolute top-0 left-0 right-0 md:block h-full w-full flex bg-black opacity-50 ">
                    <img
                        className={`aspect-square object-cover h-full w-full transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                        src={stepImages[currentStep - 1]}
                        alt="step image"
                    />
                </div>
            </div>
        </>
    );
};

export default CreateTrip;
