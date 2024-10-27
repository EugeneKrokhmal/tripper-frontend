import React, { ChangeEvent } from 'react';

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onEndDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange, required }) => {
    return (
        <div id="date-range-picker" className="flex items-center gap-2">


            <input
                id="datepicker-range-start"
                name="start"
                type="date"
                value={startDate}
                onChange={onStartDateChange}
                className={'block w-full p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-4 text-sm'}
                placeholder="Select start date"
                required={required}
            />

            <input
                id="datepicker-range-end"
                name="end"
                type="date"
                value={endDate}
                onChange={onEndDateChange}
                className={'block w-full p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-4 text-sm'}
                placeholder="Select end date"
                required={required}
            />
        </div>
    );
};

export default DateRangePicker;
