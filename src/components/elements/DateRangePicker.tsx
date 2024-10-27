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
        <div id="date-range-picker" className="flex items-center gap-2">
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('startDate')}
                    {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="datepicker-range-start"
                    name="start"
                    type="text"
                    value={startDate}
                    onChange={onStartDateChange}
                    className={'block w-full p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-4 text-sm'}
                    required={required}
                />
            </div>

            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('endDate')}
                    {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="datepicker-range-end"
                    name="end"
                    type="text"
                    value={endDate}
                    onChange={onEndDateChange}
                    className={'block w-full p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-4 text-sm'}
                    required={required}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
