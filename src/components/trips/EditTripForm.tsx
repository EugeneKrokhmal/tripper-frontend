import React, { useState, useEffect } from 'react';
import InputField from '../elements/InputField';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import EditIcon from '../../images/icons/edit.svg';
import ImageUpload from '../ImageUpload';
import { useTranslation } from 'react-i18next';
import DateRangePicker from '../elements/DateRangePicker';
import { useAutocomplete } from '../../hooks/useAutocomplete';
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
    onImageUploadSuccess: (imageUrl: string) => void;
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
    onImageUploadSuccess
}) => {
    const { t } = useTranslation();
    const [tripName, setTripName] = useState<string>(initialTripName);
    const [tripDescription, setTripDescription] = useState<string>(initialTripDescription);
    const [destination, setDestination] = useState<string>(initialDestination);
    const [startDate, setStartDate] = useState<string>(initialStartDate);
    const [endDate, setEndDate] = useState<string>(initialEndDate);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [tripImage, setTripImage] = useState<string | null>(null);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(initialCoordinates);

    const OPEN_CAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY || '';
    const { autocompleteResults, fetchResults, clearResults } = useAutocomplete(OPEN_CAGE_API_KEY);

    useEffect(() => {
        setCoordinates(initialCoordinates);
        if (!tripImage) {
            setTripImage(`${process.env.REACT_APP_API_BASE_URL}/uploads/${id}/image.jpg`);
        }
    }, [initialCoordinates, id, tripImage]);

    const handleLocationChange = (value: string) => {
        setDestination(value);
        fetchResults(value);
    };

    const handleAutocompleteSelect = (result: any) => {
        setDestination(result.formatted);
        setCoordinates({
            lat: result.geometry.lat,
            lng: result.geometry.lng,
        });
        clearResults();
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

    const closeModal = () => {
        setModalVisible(false);
        onCancel();
    };

    return (
        <div className="absolute start-4 top-0 bottom-0 end-4 flex justify-end p-3">
            {modalVisible && (
                <Modal onClose={closeModal}>
                    <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                        <span className="text-gradient">
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
                                <ul className="absolute top-20 w-full bg-white border border-zinc-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {autocompleteResults.map((result, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-zinc-200 cursor-pointer"
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
                            <div className="self-end">
                                <Button label={t('delete')} onClick={onDeleteClick} variant="secondary" />
                            </div>
                        </div>
                    </form>
                </Modal>
            )}

            <div className="flex gap-2 items-start">
                <ImageUpload tripId={id} onImageUploadSuccess={onImageUploadSuccess} />

                <button className="bg-white rounded py-2 px-2" onClick={() => setModalVisible(true)} title={t('edit')}>
                    <img src={EditIcon} alt="Edit" />
                </button>
            </div>
        </div>
    );
};

export default EditTripForm;
