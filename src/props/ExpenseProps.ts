import { Expense } from '../types/Expense';
import { User } from '../types/User';

export interface ExpensesListProps {
    userId: string;
    isOwner: boolean;
    expenses: Expense[];
    participants: User[];
    tripId: string;
    token: string;
    onExpenseDeleted: (updatedExpenses: Expense[]) => void;
    onExpenseAdded: (newExpense: Expense) => void;
    onEditExpense: (newExpense: Expense) => void;
}

export interface ExpenseSummaryWidgetProps {
    totalPaidByUser: number;
    totalCost: number;
    fairShare: number;
    onFairShareUpdate: (fairShare: number, settlements: any[]) => void;
    tripId: string;
    onAddExpenseClick: () => void;
    remainingOwedToUser: number;
    isOwner: boolean;
    admins: User[];
    participants: User[];
    expenses: Expense[];
}

export interface ExpenseSummaryProps {
    totalPaidByUser: number;
    totalCost: number;
    fairShare: number;
    tripId: string;
    remainingOwedToUser: number;
}

export interface ExpenseFormProps {
    isOwner: boolean;
    userId: string;
    participants: any[];
    tripId: string;
    token: string;
    onExpenseAdded?: (newExpense: any) => void;
    onExpenseUpdated?: (updatedExpense: any) => void;
    expenseToEdit?: any;
}