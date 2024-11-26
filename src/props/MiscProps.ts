import { User } from "../types/User";

export interface WeatherWidgetProps {
    latitude: number;
    longitude: number;
}

export interface Activity {
    author: string;
    name: string;
    description: string;
    time: string;
    bookingLink?: string;
    transportation?: { title: string; lat?: number; lng?: number };
}

export interface TripTimelineProps {
    isOwner: boolean;
    isAdmin: boolean;
    startDate: string;
    endDate: string;
    tripId: string;
    token: string;
    API_BASE_URL: string;
    OPEN_CAGE_API_KEY: string;
}

export interface TripSearchAndFilterProps {
    onSearch: (query: string) => void;
    onFilter: (filters: string[]) => void;
}
