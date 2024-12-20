import { Trip } from '../types/Trip';
import { User } from '../types/User';
import { Expense } from '../types/Expense';

export interface TripCardProps {
    trip: Trip;
    loggedInUserId: string;
    isActive: boolean;
    image?: string;
}

export interface TripInfoProps {
    tripName: string;
    tripDescription: string;
    startDate: string;
    endDate: string;
    tripDuration: number;
    isOwner: boolean;
    participants: User[];
    joinLink: string | null;
    onGenerateJoinLink: () => void;
    loadingJoinLink: boolean;
    error: string | null;
}

export interface TripMapProps {
    coordinates: { lat: number; lng: number };
    destination: string;
}

export interface TripParticipantsProps {
    trip: Trip,
    tripId: string;
    userId: string;
    isOwner: boolean;
    admins: User[];
    participants: User[];
    expenses: Expense[];
}
