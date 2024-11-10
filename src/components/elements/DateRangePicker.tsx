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
                <label className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white">
                    {t('startDate')}
                    {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    placeholder={startDate}
                    id="datepicker-range-start"
                    name="start"
                    type="date"
                    value={startDate}
                    onChange={onStartDateChange}
                    className="block w-full text-xs p-2.5 text-zinc-900 bg-zinc-50 border border-zinc-300 rounded-md dark:border-zinc-700 dark:text-zinc-300 dark:bg-zinc-900 focus:ring-emerald-600 focus:border-emerald-600 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm transition-colors ease-in-out duration-200"
                    required={required}
                />
            </div>

            <div className="flex-grow w-full">
                <label className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white">
                    {t('endDate')}
                    {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="datepicker-range-end"
                    name="end"
                    type="date"
                    value={endDate}
                    onChange={onEndDateChange}
                    className="block w-full text-xs p-2.5 text-zinc-900 bg-zinc-50 border border-zinc-300 rounded-md dark:border-zinc-700 dark:text-zinc-300 dark:bg-zinc-900 focus:ring-emerald-600 focus:border-emerald-600 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm transition-colors ease-in-out duration-200"
                    required={required}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
