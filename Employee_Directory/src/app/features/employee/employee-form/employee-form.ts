import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // ⭐ ADDED

import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule // ⭐ ADDED
  ],
  template: `
    <h2>Add Employee</h2>

    <form [formGroup]="form" (ngSubmit)="submit()">

      <mat-form-field appearance="fill" style="width:100%;">
        <mat-label>First Name</mat-label>
        <input matInput formControlName="firstName">
      </mat-form-field>

      <mat-form-field appearance="fill" style="width:100%;">
        <mat-label>Last Name</mat-label>
        <input matInput formControlName="lastName">
      </mat-form-field>

      <mat-form-field appearance="fill" style="width:100%;">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email">
      </mat-form-field>

      <mat-form-field appearance="fill" style="width:100%;">
        <mat-label>Department</mat-label>
        <input matInput formControlName="department">
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">
        Save
      </button>

    </form>
  `
})
export class EmployeeForm {

  form: any;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar // ⭐ ADDED
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  // ⭐ CHANGED (added snackbar)
  submit() {
    if (this.form.valid) {
      this.service.addEmployee(this.form.value).subscribe(() => {

        this.snackBar.open('Employee Added Successfully!', 'Close', {
          duration: 3000
        });

        this.router.navigate(['/employees']);
      });
    }
  }
}