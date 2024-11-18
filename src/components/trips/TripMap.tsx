import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TripMapProps {
    coordinates: { lat: number; lng: number };
    destination: string;
}

declare global {
    interface Window {
        H: any;
    }
}

const TripMap: React.FC<TripMapProps> = ({ coordinates, destination }) => {
    const mapRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (coordinates && mapRef.current) {
            const H = window.H;

            const platform = new H.service.Platform({
                apikey: process.env.REACT_APP_HERE_MAPS_API_KEY || '',
            });

            const defaultLayers = platform.createDefaultLayers();

            const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
                center: coordinates,
                zoom: 12,
            });

            const marker = new H.map.Marker(coordinates);
            map.addObject(marker);

            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
            window.addEventListener('resize', () => map.getViewPort().resize());
        }
    }, [coordinates]);

    return (
        <div className="grid grid-cols-2 gap-2 rounded">
            <div className="flex flex-col jsutify-betfeen items-start">
                <div>
                    <h3 id="theplace" className="mb-2 text-2xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                        <span className="text-gradient">{t('thePlace')}</span>
                    </h3>
                    <p className="text-sm mb-2 text-zinc-500 dark:text-zinc-300">
                        <strong>{destination}.</strong>
                    </p>
                </div>
                <a href={'https://maps.google.com/?q=' + coordinates.lat + ',' + coordinates.lng} className="mt-4 px-4 py-2 border inline-flex gap-2 border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" target="_blank" rel="noopener noreferrer">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                    <span className="text-xs md:text-sm self-center">Navigate</span>
                </a>
            </div>
            <div className="rounded" ref={mapRef} style={{ overflow: 'hidden', width: '100%', height: '100%' }} />
        </div>
    )
};

export default TripMap;
