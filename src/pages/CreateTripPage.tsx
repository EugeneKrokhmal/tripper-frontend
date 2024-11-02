import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateTrip from '../components/trips/CreateTrip';

const CreateTripPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <CreateTrip />
        </>
    );
};

export default CreateTripPage;
