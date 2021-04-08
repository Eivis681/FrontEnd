import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IExpense } from "../../models/expense.model";
import { DataService } from "../../services/data.service";
import { IAccountData, IContact } from "../../models/account.model";
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl} from '@angular/forms';
import {  Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

function ValidateCost(control: AbstractControl): {[key: string]: any} | null{
  if (control.value < 1)
  {
    return { "spent": false}
  }
  return null
}

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {

  header: string = "Create Expense";
  myControl: FormGroup;
  contact: IContact[] = [];
  contactFilterdOptions: Observable<IContact[]>
  accountFilteredOptions: Observable<IAccountData[]>
  accounts: IAccountData[];
  newExpense: Partial<IExpense> = {}
  contactName: string
  vat: any
  total: any

  constructor(private service: DataService,
    private dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IExpense,
    private fb: FormBuilder, 
    private datePipe: DatePipe)  {}

  ngOnInit() {
    this.myControl = this.fb.group({
      accountName: ['', Validators.required], 
      contactFullName: ['', Validators.required],
      project: [this.data.project === undefined ? null : this.data.project, Validators.required],
      date: [new Date(this.data.date), Validators.required],
      spent: [this.data.spent === undefined ? null : this.data.spent, [ValidateCost] ],
      comment: [this.data.comment === undefined ? null : this.data.comment, Validators.required],
    })
    this.service.getAccounts().subscribe(result => {
      this.accounts = result
    })
    this.contactName = this.data.contactFullName
    
    this.myControl.get('spent').valueChanges.subscribe(cost => {
      this.calculateTotal(cost)
    })

    this.accountFilteredOptions = this.myControl.get('accountName').valueChanges.pipe(
      startWith(this.data.accountName === undefined ? '' : this.data.accountName),
      map(value => this.filterAccount(value)),
    )

    this.contactFilterdOptions = this.myControl.get('contactFullName').valueChanges.pipe(
      startWith(this.data.contactFullName === undefined ? '' : this.data.contactFullName),
      map(value => this.filterContact(value))
    )

    if (Object.keys(this.data).length !== 0 ) {
      this.header = "Update Expense"
      this.total = this.data.total
      this.vat = this.data.vat
      this.myControl.patchValue({
        contactFullName: this.data.contactFullName,
        accountName: this.data.accountName,
      })
    }
  }

  private calculateTotal(cost: number) {
    this.vat = (cost * 0.21).toFixed(2)
    this.total = (+this.vat + +cost).toFixed(2)
  }

  private filterAccount(value: string): IAccountData[] {
    if (this.accounts.find(ob => ob.employerName.toLowerCase() === value.toLowerCase())) {
      this.contact = []
      const guid = this.accounts.find(obj=>obj.employerName.toLowerCase() === value.toLowerCase()).accountGuid
      this.service.getContacts(guid).subscribe(data=>{
        this.contact = data
        if (this.contactName != null) {
          this.myControl.patchValue({
            contactFullName: this.contactName
          })
          this.contactName = null
        }
        else {
          this.myControl.patchValue({
            contactFullName: ''
          })
        }
      })
      this.myControl.controls['accountName'].setErrors(null)
    }
    else{
      this.myControl.controls['accountName'].setErrors({'incorrect': true})
    }

    const filterValue = value.toLowerCase();
    return this.accounts.filter(options => options.employerName.toLowerCase().includes(filterValue))
  }

  private filterContact(value: string): IContact[] {
    if(this.contact.find(data=> data.fullName === value)){
      this.myControl.controls['contactFullName'].setErrors(null)
    }
    else{
      this.myControl.controls['contactFullName'].setErrors({'incorrect': true})
    }
    const filterValue = value.toLowerCase();
    return this.contact.filter(con => con.fullName.toLowerCase().includes(filterValue))
  }

  saveExpense() {
    this.newExpenses(this.myControl.value)
    this.dialogRef.close(this.newExpense)
  }

  closeWindow() {
    this.dialogRef.close(null)
  }

  newExpenses(value: IExpense) {
    if (this.header === "Update Expense") {
      this.newExpense.expensesGuid = this.data.expensesGuid
    }
    this.newExpense.accountGuid = this.accounts.find(obj => obj.employerName === value.accountName).accountGuid
    this.newExpense.contactGuid = this.contact.find(obj => obj.fullName === value.contactFullName).contactGuid
    this.newExpense.accountName = value.accountName
    this.newExpense.contactFullName = value.contactFullName
    this.newExpense.comment = value.comment
    this.newExpense.spent = value.spent
    this.newExpense.vat = this.vat
    this.newExpense.total = this.total
    this.newExpense.project = value.project
    this.newExpense.date = this.datePipe.transform(value.date, 'MM/dd/yyyy')
  }
}
// function validated(c: FormControl): ValidationErrors{
  //   if (this.accounts === undefined)
  //   {
  //     return {"accountName": false}
  //   }
  //   if (this.accounts.find(data=> data.employerName !==c.value))
  //   {
  //     return {"accountName": false}
  //   }
  //   return {"accountName": true}
  // }

  // console.log(guid)
      // this.accounts.find(object => object.employerName.toLowerCase() === value.toLowerCase()).contact.map(contact => {
      //   this.contact.push(contact)
      // })
      // if (this.contactName != null) {
      //   this.myControl.patchValue({
      //     contactFullName: this.contactName
      //   })
      //   this.contactName = null
      // }
      // else {
      //   this.myControl.patchValue({
      //     contactFullName: ''
      //   })
      // }

//test

// function ValidateAccount(control: AbstractControl): {[key: string]: any} | null{
//   if (this.accounts === undefined)
//   {
//     console.log("noooooooo")
//     return null
//   }
//   if (this.accounts.find(data=> data.employerName !== control.value))
//   {
//     return {"accountName": false}
//   }
//   return null
// }


//    ValidateAccount(control: AbstractControl): {[key: string]: any} | null{
//   if (this.accounts === null)
//   {
//     console.log("noooooooo")
//     return null
//   }
//   if (this.accounts.find(data=> data.employerName !== control.value))
//   {
//     return {"accountName": false}
//   }
//   return null
// }

// ValidateAccount(control: AbstractControl): {[key: string]: any} | null{
  //   // if (typeof(this.options) == 'undefined'){
  //   //   return null
  //   // }
  //   // if(this.options.find(data=> data.employerName !==control.value))
  //   // {
  //   //   return {"accountName": false}
  //   // }
  //   return null
  // }

// function validateEmployer(accountName: string, accounts: IAccountData[]){
//   return (formGroup: FormGroup)=>{
//     const control =formGroup.controls[accountName]
//     if (accounts.find(data=> data.employerName !== control.value)){
//       control.setErrors({mustMatch: true})
//     }
//     else{
//       control.setErrors(null)
//     }
    
//   }
// }

 // filterValid(): ValidatorFn{
    
  //   //control1.setErrors({notEquivalent: true})
  //   if (this.options.find(data=> data.employerName.toLowerCase() === this.myControl.get('accountName').value))
  //   {
  //     return 
      
  //     // const control = th
  //     // return ;
  //   }
  //   return  
  // }
  // (group: FormGroup): ValidationErrors =>{
  //   const control1 = group.controls['accountName'];
  //   control1.setErrors({notEquivalent: true})
  // }


// function calculateTotal() {
//   throw new Error('Function not implemented.');
// }
//this.data.accountName === undefined ? null : this.data.accountName
//this.data.contactFullName === undefined ? null : this.data.contactFullName
// if(this.options.find(obj=> obj.contact.map(con=> con.fullName === value.contactFullName)))
      // {
      //   var contactGuid = this.options.find(obj=> obj.contact.find(con=> con.fullName === value.contactFullName))
      //   console.log(contactGuid)
      //   //this.newExpense.contactGuid = 
      // }
 // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // private filterAccount(value: string): string[]{
  //   const filterValue = value.toLowerCase();

  // }

    //

    // this.accountFilteredOptions.subscribe(data=>{
    //   console.log(data)
    // })
    // this.contactFilterdOptions = this.myControl.get("").valueChanges.pipe(
    //   startWith(''),
    //   map(value=> this.filterContact(value))
    // )


    // this.service.getAccounts().subscribe(
    //   data=> {
    //     this.account = data
    //   }
    // )
    //this.expenses = this.expense.getExpense()
    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );