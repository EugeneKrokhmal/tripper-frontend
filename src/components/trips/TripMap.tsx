import React, { useEffect, useRef } from 'react';

interface TripMapProps {
    coordinates: { lat: number; lng: number };
}

declare global {
    interface Window {
        H: any;
    }
}

const TripMap: React.FC<TripMapProps> = ({ coordinates }) => {
    const mapRef = useRef(null);

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

    return <div className="rounded-t" ref={mapRef} style={{ overflow: 'hidden', width: '100%', height: '235px' }} />;
};

export default TripMap;
