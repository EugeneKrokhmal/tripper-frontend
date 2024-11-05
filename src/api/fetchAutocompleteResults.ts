// api/fetchAutocompleteResults.ts
import axios from 'axios';

export const fetchAutocompleteResults = async (query: string, apiKey: string): Promise<any[]> => {
    try {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=5`
        );
        return response.data.results || [];
    } catch (err) {
        console.error('Error fetching location suggestions', err);
        return [];
    }
};
