// src/api/tripApi.ts
import axios from 'axios';

export const fetchTripDetails = async (tripId: string, token: string, API_BASE_URL: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/trips/${tripId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trip details:', error);
        throw new Error('Failed to fetch trip details');
    }
};
