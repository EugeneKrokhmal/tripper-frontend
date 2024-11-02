import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateTrip from '../components/trips/CreateTrip';
import CreateTripImage from '../images/gallery/5.jpg'

const CreateTripPage = () => {
    const { t } = useTranslation();

    return (
        <>
        <div className="container max-w-7xl h-full mx-auto px-4 flex flex-col-reverse md:flex-row justify-center py-32 h-full">
            {/* Left: Image */}
            <div className="hidden md:block h-full w-full md:w-1/2 flex">
                <img className="aspect-square object-cover h-full w-full" src={CreateTripImage} alt={t('createTripTitle')} />
            </div>

            {/* Right: Login Form */}
            <div className="w-full md:w-1/2 flex flex-col md:justify-center md:p-16">
                <CreateTrip />
            </div>
        </div>
        </>
    );
};

export default CreateTripPage;
