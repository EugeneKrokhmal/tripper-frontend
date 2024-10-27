import React, { useState } from 'react';
import InputField from '../elements/InputField';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import EditIcon from '../../images/icons/edit.svg';
import ImageUpload from '../ImageUpload';
import { useTranslation } from 'react-i18next';
import DateRangePicker from '../elements/DateRangePicker';

interface EditTripFormProps {
    id: string;
    initialTripName: string;
    initialTripDescription: string;
    initialDestination: string;
    initialStartDate: string;
    initialEndDate: string;
    onDeleteClick: () => void;
    onSubmit: (updatedTrip: {
        tripName: string;
        tripDescription: string;
        destination: string;
        startDate: string;
        endDate: string;
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
    const [tripImage, setTripImage] = useState<string | null>(null);
    const { t } = useTranslation();

    const handleSubmit = () => {
        onSubmit({
            tripName,
            tripDescription,
            destination,
            startDate,
            endDate,
        });
        setModalVisible(false);
    };

    const handleImageUploadSuccess = (imageUrl: string) => {
        setTripImage(imageUrl);
    };

    const closeModal = () => {
        setModalVisible(false);
        onCancel();
    };

    return (
        <div className="absolute start-4 top-0 bottom-0 flex justify-end p-3">
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

                        <InputField
                            type="text"
                            label={t('destination')}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />

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
                <ImageUpload tripId={id} onImageUploadSuccess={handleImageUploadSuccess} />
                <button className="bg-white rounded py-2 px-2" onClick={() => setModalVisible(true)} title={t('edit')}>
                    <img src={EditIcon} alt="Edit" />
                </button>
            </div>
        </div>
    );
};

export default EditTripForm;
