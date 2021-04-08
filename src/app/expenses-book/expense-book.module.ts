import { NgModule } from '@angular/core';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { ExpenseBookComponent } from './expense-book/expense-book.component';
import { DataService } from '../services/data.service';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    CreateUpdateComponent,
    ExpenseBookComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: 'expense', component: ExpenseBookComponent, canActivate: [AuthGuard]}]), 
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, DatePipe],
  bootstrap: []
})
export class ExpenseBookModule { }
