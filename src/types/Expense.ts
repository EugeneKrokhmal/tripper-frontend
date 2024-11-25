export interface Expense {
    _id: string;
    expenseName: string;
    expenseDescription?: string;
    amount: number;
    responsibleUserId: string;
    date?: string;
    splitParticipants: string[];
}
