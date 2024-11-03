import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Slider from 'react-slick';
import TripCard from '../trips/TripCard';
import { useTranslation } from 'react-i18next';
import Loader from '../structure/Loader';
import 'slick-carousel/slick/slick.css';

interface Trip {
    _id: string;
    name: string;
    creator: { _id: string; name: string; email: string };
    participants: { _id: string; name: string; email: string }[];
    startDate: string;
    endDate: string;
    location: { destination: string };
}

const TripsSlider: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const loggedInUserId = useSelector((state: RootState) => state.auth.userId);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { t } = useTranslation();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripsResponse = await axios.get(`${API_BASE_URL}/api/user-trips`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTrips(tripsResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch trips');
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            setError('User is not authenticated.');
            setLoading(false);
        }
    }, [API_BASE_URL, token, isAuthenticated]);

    if (loading) return <Loader />;
    if (trips.length === 0) return null;

    // Custom Dot Component
    const CustomDot = (props: any) => {
        const { onClick, isActive } = props;
        return (
            <div
                onClick={onClick}
                className={`drop-bounce delay-300 w-3 h-3 mx-1 rounded-full cursor-pointer transition-all duration-300 ${
                    isActive ? 'active bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500' : 'bg-gray-400'
                }`}
            />
        );
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                },
            },
        ],
        beforeChange: (current: number, next: number) => setActiveSlideIndex(next),
        appendDots: (dots: any) => (
            <div className="flex mt-4 space-x-2">
                {dots.map((dot: any, index: number) => (
                    <CustomDot key={index} onClick={dot.props.onClick} isActive={index === activeSlideIndex} />
                ))}
            </div>
        ),
        customPaging: () => <span></span>,
    };

    return (
        <div className="mx-auto px-4">
            <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">
                    {t('myTrips')}
                </span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-6">
                {t('createTripTitle')}
            </p>
            <Slider {...sliderSettings} className="trip-slider">
                {trips.map((trip, index) => (
                    <div key={trip._id} className="pr-4 min-w-72 max-w-72 md:min-w-full md:max-w-full">
                        <TripCard
                            isActive={index >= activeSlideIndex && index < activeSlideIndex + 2}
                            trip={trip}
                            loggedInUserId={loggedInUserId || ''}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TripsSlider;
