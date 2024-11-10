// src/utils/tripUtils.ts

import axios from 'axios';

export const calculateTotalPaidByUser = (expenses: any[], userId: string): number => {
    return expenses
        .filter(expense => expense.responsibleUserId === userId)
        .reduce((total, expense) => total + expense.amount, 0);
};

export const calculateTotalCost = (expenses: any[]): number => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const calculateRemainingOwedToUser = (settlements: any[], userId: string): number => {
    return settlements
        .filter(settlement => settlement.creditor === userId && !settlement.settled)
        .reduce((total, settlement) => total + settlement.amount, 0);
};

export const fetchCityImage = async (destination: string, UNSPLASH_ACCESS_KEY: string) => {
    if (!UNSPLASH_ACCESS_KEY || !destination) return null;

    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: `${destination} center`,
                client_id: UNSPLASH_ACCESS_KEY,
                per_page: 1,
            },
        });

        if (response.data.results.length > 0) {
            return response.data.results[0].urls.small;
        }
    } catch (error) {
        console.error('Error fetching Unsplash image:', error);
    }

    return null;
};
