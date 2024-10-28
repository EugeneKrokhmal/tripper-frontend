import React, { useState } from 'react';
import Button from '../elements/Button';
import InputField from '../elements/InputField';
import { useTranslation } from 'react-i18next';

interface TripSearchAndFilterProps {
    onSearch: (query: string) => void;
    onFilter: (filters: string[]) => void;
}

const TripSearchAndFilter: React.FC<TripSearchAndFilterProps> = ({ onSearch, onFilter }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const { t } = useTranslation();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const toggleFilter = (filter: string) => {
        const newFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter];
        setSelectedFilters(newFilters);
        onFilter(newFilters);
    };

    return (
        <section className="mb-8 flex items-center">
            <div className="mx-auto w-full">
                <div className="bg-white dark:bg-gray-800 sm:rounded-lg">
                    <div className="flex flex-col items-end justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                        <div className="w-full">
                            <InputField
                                label={t('searchTrips')}
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TripSearchAndFilter;
