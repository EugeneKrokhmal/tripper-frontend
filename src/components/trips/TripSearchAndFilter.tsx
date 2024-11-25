import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '../elements/InputField';
import type { TripSearchAndFilterProps } from '../../index';

const TripSearchAndFilter: React.FC<TripSearchAndFilterProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { t } = useTranslation();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <section className="mb-2 md:mb-8 flex items-center">
            <div className="mx-auto w-full">
                <div className="bg-white dark:bg-zinc-800 sm:rounded-lg">
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
