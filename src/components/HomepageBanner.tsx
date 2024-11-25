import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroImage from '../images/screen1.jpg';

import Button from './elements/Button';

gsap.registerPlugin(ScrollTrigger);

const HomepageBanner: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { t } = useTranslation();

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.scrollDist',
                start: 'top top',
                end: 'bottom',
                scrub: 1
            }
        })
            .from('.bg', { scale: 1, opacity: 1, })
            .to('.bg', { scale: 1.5, opacity: 0 })
    }, []);

    return (
        <div className="h-screen scrollDist overflow-hidden" >
            <div className="relative flex justify-center mb-16">
                <div className="absolute bottom-0 inset-0 bg">
                    <img src={HeroImage} alt="Background Image" className="object-cover object-center w-full h-full" />
                    <div className="absolute inset-0 h-full"></div>
                </div>
                <div className="z-10 justify-center mx-auto h-screen w-full max-w-screen-xl flex flex-col items-center md: md:justify-start md:flex-row gap-10 px-4 pb-20 content">
                    <div className="md:w-2/3 text-left">
                        <h1 className="mb-4 text-4xl font-extrabold text-zinc-900 dark:text-white lg:text-7xl">
                            <span className="text-white">
                                {t('welcomeToTripper')}
                            </span>
                        </h1>
                        <p className="text-white text-m mb-8">
                            {t('discoverAndPlan')}
                        </p>
                        <div className="flex md:flex-row mt-8 gap-2 justify-start">
                            {isAuthenticated ? (
                                <>
                                    <Button
                                        label={t('createTrip')}
                                        onClick={() => navigate('/new-trip')}
                                        variant="primary"
                                    />
                                    <Button
                                        label={t('explore')}
                                        onClick={() => navigate('/dashboard')}
                                        variant="secondary"
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        label={t('login')}
                                        onClick={() => navigate('/login')}
                                        variant="primary"
                                    />
                                    <Button
                                        label={t('register')}
                                        onClick={() => navigate('/register')}
                                        variant="secondary"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomepageBanner;

