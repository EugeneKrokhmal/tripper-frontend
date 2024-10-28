import React, { useState, useEffect } from 'react';
import InputField from '../elements/InputField';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import EditIcon from '../../images/icons/edit.svg';
import ImageUpload from '../ImageUpload';
import { useTranslation } from 'react-i18next';
import DateRangePicker from '../elements/DateRangePicker';
import axios from 'axios';

interface EditTripFormProps {
    id: string;
    initialTripName: string;
    initialTripDescription: string;
    initialDestination: string;
    initialStartDate: string;
    initialEndDate: string;
    initialCoordinates: { lat: number; lng: number };
    onDeleteClick: () => void;
    onSubmit: (updatedTrip: {
        tripName: string;
        tripDescription: string;
        destination: string;
        startDate: string;
        endDate: string;
        coordinates: { lat: number; lng: number };
    }) => void;
    onCancel: () => void;
}

const EditTripForm: React.FC<EditTripFormProps> = ({
    id,
    initialTripName,
    initialTripDescription,
    initialDestination,
    initialStartDate,
    initialEndDate,
    initialCoordinates,
    onDeleteClick,
    onSubmit,
    onCancel,
}) => {
    const [tripName, setTripName] = useState<string>(initialTripName);
    const [tripDescription, setTripDescription] = useState<string>(initialTripDescription);
    const [destination, setDestination] = useState<string>(initialDestination);
    const [startDate, setStartDate] = useState<string>(initialStartDate);
    const [endDate, setEndDate] = useState<string>(initialEndDate);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
    const [tripImage, setTripImage] = useState<string | null>(null);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(initialCoordinates);
    const { t } = useTranslation();
    const OPEN_CAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

    useEffect(() => {
        setCoordinates(initialCoordinates);
        // Load initial image if available
        if (tripImage === null) setTripImage(`${process.env.REACT_APP_API_BASE_URL}/uploads/${id}/image.jpg`);
    }, [initialCoordinates, id]);

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

    const debouncedFetchAutocomplete = debounce(fetchAutocompleteResults, 300);

    const handleLocationChange = (value: string) => {
        setDestination(value);
        debouncedFetchAutocomplete(value);
    };

    const handleAutocompleteSelect = (result: any) => {
        setDestination(result.formatted);
        setCoordinates({
            lat: result.geometry.lat,
            lng: result.geometry.lng,
        });
        setAutocompleteResults([]);
    };

    const handleSubmit = () => {
        onSubmit({
            tripName,
            tripDescription,
            destination,
            startDate,
            endDate,
            coordinates,
        });
        setModalVisible(false);
    };

    const handleImageUploadSuccess = (imageUrl: string) => {
        setTripImage(imageUrl);  // Update image URL upon successful upload
    };

    const closeModal = () => {
        setModalVisible(false);
        onCancel();
    };

    return (
        <div className="absolute start-4 top-0 bottom-0 end-4 flex justify-end p-3">
            {modalVisible && (
                <Modal onClose={closeModal}>
                    <h3 className="mb-2 text-4xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            {t('editTrip')}
                        </span>
                    </h3>

                    <form className="max-h-[70vh] overflow-y-auto">
                        <InputField
                            type="text"
                            label={t('tripName')}
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                        />

                        <div className="relative">
                            <InputField
                                type="text"
                                label={t('destination')}
                                value={destination}
                                onChange={(e) => handleLocationChange(e.target.value)}
                            />

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
                            value={tripDescription}
                            onChange={(e) => setTripDescription(e.target.value)}
                        />

                        <div className="flex justify-between items-end gap-2">
                            <div className="flex gap-2 mt-4">
                                <Button label={t('save')} onClick={handleSubmit} variant="primary" />
                                <Button label={t('cancel')} onClick={closeModal} variant="secondary" />
                            </div>
                            <Button label={t('delete')} onClick={onDeleteClick} variant="secondary" />
                        </div>
                    </form>
                </Modal>
            )}

            <div className="flex gap-2 items-start">
                {/* Display the uploaded image */}

                {/* ImageUpload component to trigger upload */}
                <ImageUpload tripId={id} onImageUploadSuccess={handleImageUploadSuccess} />

                {/* Edit button to open modal */}
                <button className="bg-white rounded py-2 px-2" onClick={() => setModalVisible(true)} title={t('edit')}>
                    <img src={EditIcon} alt="Edit" />
                </button>
            </div>
        </div>
    );
};

export default EditTripForm;
