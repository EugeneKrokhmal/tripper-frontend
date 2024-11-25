export interface Settlement {
    _id: string;
    debtor: string;
    creditor: string;
    amount: number;
    isSettled: boolean;
}

export interface SettlementHistory {
    _id: string;
    debtor: string;
    creditor: string;
    amount: number;
    settled: boolean;
}
