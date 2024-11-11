import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../images/screen1.jpg';
import { useTranslation } from 'react-i18next';
import Button from './elements/Button';

gsap.registerPlugin(ScrollTrigger);

const HomepageBanner: React.FC = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.scrollDist',
                start: 'top top',
                end: '+=600',
                scrub: 1
            }
        })
            .from('.bg', { scale: 1.5 })
            .to('.bg', { scale: 1 })
    }, []);

    return (
        <div className="h-screen scrollDist overflow-hidden">
            <div className="relative flex justify-center mb-16">
                <div className="absolute bottom-0 inset-0 bg">
                    <img src={HeroImage} alt="Background Image" className="object-cover object-center w-full h-full" />
                    <div className="absolute inset-0 h-full bg-black opacity-50"></div>
                </div>
                <div className="z-10 justify-center mx-auto h-screen w-full max-w-screen-xl flex flex-col items-center md:flex-row gap-10 px-4 pb-20">
                    <div className="md:w-2/3 text-center">
                        <h1 className="mb-4 text-5xl font-extrabold text-zinc-900 dark:text-white lg:text-7xl">
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
                                onClick={() => navigate('/new-trip')}
                                variant="primary"
                            />
                            <Button
                                label={t('explore')}
                                onClick={() => navigate('/dashboard')}
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
    );
};

export default HomepageBanner;

