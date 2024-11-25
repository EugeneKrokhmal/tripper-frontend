import axios from 'axios';

export const deleteParticipantFromTrip = async (userId: string, tripId: string, token: string): Promise<void> => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    await axios.delete(`${API_BASE_URL}/api/user/remove-from-trip`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId, tripId }
    });
};
