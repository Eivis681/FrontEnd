import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { IExpense } from "../../models/expense.model";
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateComponent } from '../create-update/create-update.component';


@Component({
  selector: 'app-expense-book',
  templateUrl: './expense-book.component.html',
  styleUrls: ['./expense-book.component.css']
})
export class ExpenseBookComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'employer', 'employee', 'project', 'date', 'spent', 'vat', 'total', 'coment', 'buttons'];

  expenses: IExpense[];
  dataSource = new MatTableDataSource;
  updateCreateExpenses: IExpense;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: DataService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit() {
    this.service.getExpenses().subscribe(response => {
      this.expenses = response
      this.dataSource.data = this.expenses 
    });
  }
 
  deleteExpense(id: number) {
    if (confirm(`Are you sure you want to delete No. ${id + 1} record ?`)) {
      var guid = this.expenses[id].expensesGuid
      this.service.deleteExpense(guid).subscribe(response=>{
          this.expenses.splice(id,1)
          this.dataSource.data = this.expenses
      })
    }
  }

  updateExpense(id: number) {
    let dialogRef = this.dialog.open(CreateUpdateComponent, {
      width: '550px',
      data: this.expenses[id],
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.service.updateExpense(result).subscribe(response=>{
          console.log(response)
          this.expenses[id] = result
          this.dataSource.data = this.expenses
        })
      }
    })
  }

  createExpense() {
    let dialogRef = this.dialog.open(CreateUpdateComponent, {
      width: '550px',
      data: {}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.service.createExpense(result).subscribe(response=>{
          result.expensesGuid = response
          this.expenses.push(result)
          this.dataSource.data = this.expenses
        })
      }
    })
  }

}
  //expenses = new MatTableDataSource<IExpense>(this.expenses)
  // dataSource = new MatTableDataSource<IExpense>(this.expenses);
  // get asd(): IExpense[] {
  //   return this.expenses
  // }

  // set setAsd(data: IExpense){
  //   this.expenses.push(data)
  // }
  // openForm(id: number){

  // }

  // getExpense(): IExpense {
  //   return this.updateExpenses
  // }

  // setExpense(id: number): void {
  //   this.updateExpenses = this.expenses[id]
  // }
    //this.dataSource.paginator = this.paginator
    //this.dataSource = new MatTableDataSource<IExpense[]>(response)
// this.service.getAccounts().pipe(
    //   map(response=>{
    //     console.log(response.length)
    //   })
    // )
    // this.accounts = this.service.accounts;
    // this.service.getAccounts()
    // this.service.getAccounts().subscribe(data=>{
    //   console.log(data)
    //   this.accounts = data
    // })

    // this.service.getExpenses().subscribe(data=>{
    //   console.log(data)
    // })


  // accounts = {
  //   accountGuid: "12000",
  //   employerName: "tom",
  // }
  // acc: Observable<IAccountData> | undefined
  // asd: IAccountData[] = [
  //   {
  //     employerName: "asd",
  //     accountGuid: "dad", 
  //     contact: [{
  //       contactGuid: "asdasd",
  //       fullName: "dasdas"
  //     }]
  //   }
  // ]