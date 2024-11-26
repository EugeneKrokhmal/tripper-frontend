import { User } from '../types/User';
import type { Trip } from '../types/Trip';

export interface UsersTableProps {
    trip: Trip,
    isOwner: boolean;
    admins: User[];
    participants: User[];
    expenses: {
        _id: string;
        expenseName: string;
        amount: number;
        responsibleUserId: string;
        splitParticipants: string[];
    }[];
}