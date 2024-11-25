import { Settlement, SettlementHistory } from '../types/Settlement';
import { User } from '../types/User';

export interface ExpenseSettlementTableProps {
    settlements: Settlement[];
    settlementHistory: SettlementHistory[];
    participants: User[];
    tripId: string;
    token: string;
    onSettlementUpdated: (updatedSettlement: Settlement) => void;
}
