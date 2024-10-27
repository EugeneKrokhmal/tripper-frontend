import React from 'react';
import Button from '../components/elements/Button';
import HeroImage from '../images/gallery/7.jpg';
import HeroImage2 from '../images/gallery/4.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-900">
                <div className="grid gap-8 lg:gap-0 max-w-screen-xl px-4 py-8 mt-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="lg:block h-full h-full w-full flex lg:col-span-5">
                        <img className="aspect-square object-cover h-full w-full" src={HeroImage2} alt="tripper" />
                    </div>
                    <div className="ml-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                {t('realTimeSettlements')}
                            </span>
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 dark:text-gray-300  lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            {t('realTimeSettlementsDescription')}
                        </p>
                        <div className="flex flex-row mt-8 gap-2 md:justify-start">
                            <Button
                                label={t('planYourTrip')}
                                onClick={() => { navigate('/dashboard')}}
                                variant="primary"
                            />
                            <Button
                                label={t('shareWithFriends')}
                                onClick={() => { /* Add navigation or functionality here */ }}
                                variant="secondary"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 my-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h1 className="text-center mb-12 text-5xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            {t('whyChooseTripper')}
                        </span>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {t('organizedItineraries')}
                            </h3>
                            <p className="mt-4 text-gray-500 dark:text-gray-300  dark:text-gray-400">
                                {t('organizedItinerariesDescription')}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {t('expenseSplitting')}
                            </h3>
                            <p className="mt-4 text-gray-500 dark:text-gray-300  dark:text-gray-400">
                                {t('expenseSplittingDescription')}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {t('realTimeSettlements')}
                            </h3>
                            <p className="mt-4 text-gray-500 dark:text-gray-300  dark:text-gray-400">
                                {t('realTimeSettlementsDescription')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-900">
                <div className="grid grid gap-8 lg:gap-0 max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                {t('simplifyGroupTravel')}
                            </span>
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 dark:text-gray-300  lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            {t('simplifyGroupTravelDescription')}
                        </p>
                        <div className="flex flex-row mt-8 gap-2 md:justify-start">
                            <Button
                                label={t('planYourTrip')}
                                onClick={() => { navigate('/dashboard')}}
                                variant="primary"
                            />
                            <Button
                                label={t('shareWithFriends')}
                                onClick={() => { /* Add navigation or functionality here */ }}
                                variant="secondary"
                            />
                        </div>
                    </div>
                    <div className="lg:block h-full h-full w-full flex lg:col-span-5">
                        <img className="aspect-square object-cover h-full w-full" src={HeroImage} alt="backpack" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;