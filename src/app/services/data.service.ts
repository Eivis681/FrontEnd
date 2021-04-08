import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';

import { IAccountData, IContact } from '../models/account.model';
import { IExpense } from "../models/expense.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    userEmail: string

    get logedIn(): boolean {
        return !!this.userEmail;
    }

    constructor(private http: HttpClient) {}

    getAccounts(): Observable<IAccountData[]> {
        return this.http.get<IAccountData[]>("/api/account")
    }

    getContacts(guid: string): Observable<IContact[]>{
        return this.http.get<IContact[]>(`/api/account/${guid}`)
    }


    getExpenses(): Observable<IExpense[]> {
        return this.http.get<IExpense[]>("/api/expenses").pipe(
            tap(data => console.log('All expenses' + JSON.stringify(data))),
            catchError(err => this.handleError(err))
        );
    }

    deleteExpense(guid: string) {
        return this.http.delete(`/api/expenses/${guid}`).pipe(
            tap(data => console.log(`Deleted expense ${data}`)),
            catchError(err => this.handleError(err))
        );
    }

    updateExpense(expense: IExpense) {
        return this.http.put("/api/expenses", expense).pipe(
            tap(data => console.log(`Updated expense ${data}`)),
            catchError(err => this.handleError(err))
        );
    }

    createExpense(expense: IExpense) {
        return this.http.post<IExpense>('/api/expenses', expense).pipe(
            tap(data => console.log(`Created expense ${data}`)),
            catchError(err => this.handleError(err))
        );
    }

    login(email, password): void {
        //addValidation
        this.userEmail = email
    }

    logout() {
        this.userEmail = null
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        console.log(err)
        return throwError(err)
    }
}

    //  accounts: Account[]  | undefined
    // // expenses: Observable<Expense> | undefined
    // // private _account: BehaviorSubject<Account[]>;

    // // private dataStore: {
    // //     account: Account[];
    // // }
    //expenses: IExpense[];

    // getExpenses(): IExpense[] {
    //     // return this.http.get("/api/expenses").subscribe(
    //     //     data=> 
    //     // )
    //      this.http.get<IExpense[]>("/api/expenses").subscribe(
    //         data=>{
    //             this.expenses = data
    //         }
    //     )
    //     return this.expenses
    // }
       // testmethod(){
    //     this.expenses.subscribe(data=>{
    //         console.log(data)
    //     })
    //     this.expenses= of([])
    //     this.expenses.subscribe(data=>{
    //         console.log(data)
    //     })
    // }
    // get expenses(): IExpense[] {
    //     return this.expenses
    // }
    // set expenses(data: IExpense[]) {
    //     this.expenses = data
    // }