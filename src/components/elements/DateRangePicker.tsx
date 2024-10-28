import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onEndDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange, required }) => {
    const { t } = useTranslation();

    return (
        <div id="date-range-picker" className="flex flex-row items-start gap-2 mb-4">
            <div className="flex-grow w-full">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    {t('startDate')}
                    {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="datepicker-range-start"
                    name="start"
                    type="date"
                    value={startDate}
                    onChange={onStartDateChange}
                    className="block w-full p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 focus:ring-emerald-600 focus:border-emerald-600 placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-colors ease-in-out duration-200"
                    required={required}
                />
            </div>

            <div className="flex-grow w-full">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    {t('endDate')}
                    {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="datepicker-range-end"
                    name="end"
                    type="date"
                    value={endDate}
                    onChange={onEndDateChange}
                    className="block w-full p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 focus:ring-emerald-600 focus:border-emerald-600 placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-colors ease-in-out duration-200"
                    required={required}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
