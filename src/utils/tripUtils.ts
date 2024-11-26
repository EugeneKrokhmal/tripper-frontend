// src/utils/tripUtils.ts

export const calculateTotalPaidByUser = (expenses: any[], userId: string): number => {
    return expenses.reduce((total, expense) => {
        if (expense.splitParticipants.includes(userId)) {
            const userShare = expense.amount / expense.splitParticipants.length;
            return total + userShare;
        }
        return total;
    }, 0);
};

export const calculateTotalCost = (settlementshistory: any[], expenses: any[]): number => {
    // Calculate total expense amounts
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    // Calculate total settled amounts
    const totalSettled = settlementshistory.reduce((total, settlement) => {
        return total + settlement.amount;
    }, 0);

    // Return the sum of total expenses and settled amounts
    return totalExpenses + totalSettled;
};

export const calculateRemainingOwedToUser = (settlements: any[], userId: string): number => {
    return settlements
        .filter(settlement => settlement.creditor === userId)
        .reduce((total, settlement) => total + settlement.amount, 0);
};

// Helper function to get the list of expense names for which the user is responsible
export const getResponsibleExpensesNames = (expenses: any[], userId: string) => {
    return expenses
        .filter((expense) => expense.responsibleUserId === userId)
        .map((expense) => expense.expenseName);
};

// Helper function to get the list of expenses the user is involved in (with amounts)
export const getInvolvedExpenses = (expenses: any[], userId: string) => {
    return expenses
        .filter((expense) => expense.splitParticipants.includes(userId))
        .map((expense) => ({
            name: expense.expenseName,
            amount: (expense.amount / expense.splitParticipants.length),
        }));
};
