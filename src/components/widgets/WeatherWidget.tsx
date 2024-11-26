import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';import { useNavigate } from 'react-router-dom';
import Loader from '../structure/Loader';
import type { WeatherWidgetProps } from '../../index';

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ latitude, longitude }) => {
    const { t } = useTranslation();
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}`, {
                    params: {
                        latitude: latitude,
                        longitude: longitude,
                        current_weather: true,
                        hourly: 'temperature_2m',
                    },
                });

                setWeatherData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError(t('failedToLoadWeather'));
            } finally {
                setLoading(false);
            }
        };

        if (latitude && longitude) {
            fetchWeatherData();
        }
    }, [latitude, longitude, t]);

    if (loading) return <Loader />

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="weather-widget">
            <h3 id="theplace" className="font-extrabold text-zinc-900 dark:text-white">
                <span className="text-gradient">{t('currentWeather')}</span>
            </h3>
            {weatherData && weatherData.current_weather ? (
                <>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-300  ">
                                <strong>{t('temperature')}:</strong> {weatherData.current_weather.temperature}°C
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-300  ">
                                <strong>{t('windSpeed')}:</strong> {weatherData.current_weather.windspeed} km/h
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <p>{t('noWeatherData')}</p>
            )}
        </div>
    );
};

export default WeatherWidget;
