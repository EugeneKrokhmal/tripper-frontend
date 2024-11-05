// hooks/useAutocomplete.ts
import { useState, useCallback } from 'react';
import { debounce } from '../utils/debounce';
import { fetchAutocompleteResults } from '../api/fetchAutocompleteResults';

const DEBOUNCE_DELAY = 300;

export const useAutocomplete = (apiKey: string) => {
    const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);

    const fetchResults = useCallback(
        debounce(async (query: string) => {
            if (query.length < 3) {
                setAutocompleteResults([]);
                return;
            }
            const results = await fetchAutocompleteResults(query, apiKey);
            setAutocompleteResults(results);
        }, DEBOUNCE_DELAY),
        [apiKey]
    );

    const clearResults = () => setAutocompleteResults([]);

    return { autocompleteResults, fetchResults, clearResults };
};
