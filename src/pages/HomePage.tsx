import React from 'react';
import CreateTrip from '../components/trips/CreateTrip';
import { useNavigate } from 'react-router-dom';
import Button from '../components/elements/Button';
import TripsSlider from '../components/trips/TripsSlider';
import HeroImage from '../images/screen1.jpg';
import LandingPage from './LandingPage';
import { useTranslation } from 'react-i18next';
import Loader from '../components/structure/Loader';
import HomepageBanner from '../components/HomepageBanner';

const HomePage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    if (!i18n.isInitialized) {
        <Loader />
    }

    return (
        <>
            <HomepageBanner/>

            <div className="overflow-x-hidden">
                <div className="mx-auto max-w-screen-xl my-16">
                    <TripsSlider />
                    <LandingPage />
                </div>
            </div>
        </>
    );
};

export default HomePage;
