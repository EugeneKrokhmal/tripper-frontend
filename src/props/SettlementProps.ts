import { Settlement, SettlementHistory } from '../types/Settlement';
import { User } from '../types/User';
import type { Trip } from '../types/Trip';

export interface ExpenseSettlementTableProps {
    trip: Trip,
    settlements: Settlement[];
    settlementHistory: SettlementHistory[];
    participants: User[];
    tripId: string;
    token: string;
    onSettlementUpdated: (updatedSettlement: Settlement) => void;
}
