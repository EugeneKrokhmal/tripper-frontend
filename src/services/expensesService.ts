import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Add expense
export const addExpense = async (tripId: string, expenseData: any, token: string) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/trips/${tripId}/expenses`,
        expenseData,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

// Delete expense
export const deleteExpense = async (tripId: string, expenseId: string, token: string) => {
    await axios.delete(`${API_BASE_URL}/api/trips/${tripId}/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Calculate fair share
export const calculateFairShare = async (tripId: string, token: string) => {
    const response = await axios.post(`${API_BASE_URL}/api/trips/${tripId}/calculate-fair-share`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
