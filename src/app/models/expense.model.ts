
export interface IExpense{
    expensesGuid: string;
    date: string;
    project: string;
    spent: number;
    total: number;
    vat: number;
    comment: string;
    accountGuid: string;
    accountName: string;
    contactGuid: string;
    contactFullName: string;
}