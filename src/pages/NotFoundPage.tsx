import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroImage from '../images/gallery/1.jpg';
import Button from '../components/elements/Button';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="h-screen">
            <div className="relative overflow-hidden flex justify-center mb-16">
                <div className="absolute bottom-0 inset-0">
                    <img src={HeroImage} alt="Background Image" className="object-cover object-center w-full h-full" />
                    <div className="absolute inset-0 h-full bg-black opacity-50"></div>
                </div>
                <div className="z-10 justify-center mx-auto h-screen w-full max-w-screen-xl flex flex-col items-center md:flex-row gap-10 px-4 py-32 pb-24 md:py-48 md:pb-32">
                    <div className="md:w-2/3 text-center">
                        <p className="mb-4 text-6xl md:text-9xl font-extrabold text-white dark:text-white">
                            {t('pageNotFound')}
                        </p>
                        <div className="flex md:flex-row mt-8 gap-2 justify-center">
                            <Button variant={'primary'} onClick={goHome} label={t('goBackHome')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
