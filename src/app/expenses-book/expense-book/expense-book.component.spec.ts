import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseBookComponent } from './expense-book.component';

describe('ExpenseBookComponent', () => {
  let component: ExpenseBookComponent;
  let fixture: ComponentFixture<ExpenseBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
