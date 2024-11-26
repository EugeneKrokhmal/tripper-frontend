import axios from 'axios';
import type { Trip } from '../types/Trip';

export const deleteParticipantFromTrip = async (userId: string, tripId: string, token: string): Promise<void> => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    await axios.delete(`${API_BASE_URL}/api/user/remove-from-trip`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId, tripId }
    });
};

export const addAdministrator = async (tripId: string, userId: string, token: string): Promise<void> => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    await axios.post(
        `${API_BASE_URL}/api/trips/${tripId}/administrators/add`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const removeAdministrator = async (tripId: string, userId: string, token: string): Promise<void> => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    await axios.post(
        `${API_BASE_URL}/api/trips/${tripId}/administrators/remove`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const isAdmin = (trip: Trip, userId: string) => trip?.administrators.includes(userId)
