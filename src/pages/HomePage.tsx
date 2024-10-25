import React from 'react';
import CreateTrip from '../components/trips/CreateTrip';
import { useNavigate } from 'react-router-dom';
import Button from '../components/elements/Button';
import TripsSlider from '../components/trips/TripsSlider';
import HeroImage from '../images/screen1.jpg';
import LandingPage from './LandingPage';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    if (!i18n.isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="h-screen">
                <div className="relative flex justify-center mb-16">
                    <div className="absolute bottom-0 inset-0">
                        <img src={HeroImage} alt="Background Image" className="object-cover object-center w-full h-full" />
                        <div className="absolute inset-0 h-full bg-black opacity-50"></div>
                    </div>
                    <div className="z-10 justify-center mx-auto h-screen w-full max-w-screen-xl flex flex-col items-center md:flex-row gap-10 px-4 py-32 pb-24 md:py-48 md:pb-32">
                        <div className="md:w-2/3 text-center">
                            <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white lg:text-7xl">
                                <span className="text-white">
                                    {t('welcomeToTripper')}
                                </span>
                            </h1>
                            <p className="text-white text-m mb-8 md:px-16">
                                {t('discoverAndPlan')}
                            </p>
                            <div className="flex md:flex-row mt-8 gap-2 justify-center max-w-96 mx-auto">
                                <Button
                                    label={t('createTrip')}
                                    onClick={() => navigate('/dashboard')}
                                    variant="primary"
                                />
                                <Button
                                    label={t('explore')}
                                    onClick={() => { /* Add navigation or functionality here */ }}
                                    variant="secondary"
                                />
                            </div>
                        </div>

                        {/* <div className="md:w-1/3">
                        <CreateTrip />
                    </div> */}
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-screen-xl my-16">
                <TripsSlider />
                <LandingPage />
            </div>
        </>
    );
};

export default HomePage;
