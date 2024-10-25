import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface WeatherWidgetProps {
    latitude: number;
    longitude: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ latitude, longitude }) => {
    const { t } = useTranslation(); // Use the translation hook
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}`, {
                    params: {
                        latitude: latitude,
                        longitude: longitude,
                        current_weather: true, // Fetch current weather
                        hourly: 'temperature_2m',
                    },
                });

                setWeatherData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError(t('failedToLoadWeather')); // Use translated error message
            } finally {
                setLoading(false);
            }
        };

        if (latitude && longitude) {
            fetchWeatherData();
        }
    }, [latitude, longitude, t]);

    if (loading) {
        return <p>{t('loadingWeatherData')}</p>; // Use translated loading text
    }

    if (error) {
        return <p>{error}</p>; // Use the translated error message
    }

    return (
        <div className="weather-widget bg-white dark:bg-gray-800 p-4 rounded-b shadow-lg">
            <h3 className="mb-2 text-lg text-gray:500 dark:text-gray-300 font-semibold">{t('currentWeather')}</h3>
            {weatherData && weatherData.current_weather ? (
                <>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300  ">
                                <strong>{t('temperature')}:</strong> {weatherData.current_weather.temperature}°C
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300  ">
                                <strong>{t('windSpeed')}:</strong> {weatherData.current_weather.windspeed} km/h
                            </p>
                        </div>

                        <a href={'https://maps.google.com/?q=' + latitude + ',' + longitude} className="flex mt-4 px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" target="_blank" rel="noopener noreferrer">
                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                            <span className="text-xs md:text-sm self-center">Navigate</span>
                        </a>
                    </div>
                </>
            ) : (
                <p>{t('noWeatherData')}</p> // Use translated fallback text
            )}
        </div>
    );
};

export default WeatherWidget;
