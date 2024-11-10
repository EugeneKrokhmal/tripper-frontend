// src/api/tripApi.ts

import axios from 'axios';

export const fetchTripDetails = async (tripId: string, token: string, API_BASE_URL: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/trips/${tripId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch trip details');
    }
};

export const updateTripDetails = async (tripId: string, updatedTripData: any, token: string, API_BASE_URL: string) => {
    await axios.put(`${API_BASE_URL}/api/trips/${tripId}`, updatedTripData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteTrip = async (tripId: string, token: string, API_BASE_URL: string) => {
    await axios.delete(`${API_BASE_URL}/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const generateJoinLink = async (tripId: string, token: string, API_BASE_URL: string) => {
    const response = await axios.post(`${API_BASE_URL}/api/trips/${tripId}/generate-join-link`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.joinLink;
};
