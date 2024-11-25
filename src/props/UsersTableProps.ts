import { User } from '../types/User';

export interface UsersTableProps {
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