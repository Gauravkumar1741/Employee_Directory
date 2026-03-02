import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  template: `
    <h2>Employee Directory</h2>

    <button mat-raised-button color="primary" routerLink="/add">
      Add Employee
    </button>

    <br><br>

    <!-- Search Filter -->
    <mat-form-field appearance="fill">
      <mat-label>Search by Department</mat-label>
      <input 
        matInput 
        [(ngModel)]="searchText" 
        (input)="filterEmployees()">
    </mat-form-field>

    <table mat-table 
           [dataSource]="filteredEmployees" 
           class="mat-elevation-z8" 
           style="width:100%;">

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let e">
          {{e.firstName}} {{e.lastName}}
        </td>
      </ng-container>

      <!-- Email Column -->
      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let e">
          {{e.email}}
        </td>
      </ng-container>

      <!-- Department Column -->
      <ng-container matColumnDef="department">
        <th mat-header-cell *matHeaderCellDef> Department </th>
        <td mat-cell *matCellDef="let e">
          {{e.department}}
        </td>
      </ng-container>

      <!-- Delete Column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Action </th>
        <td mat-cell *matCellDef="let e">
          <button mat-button 
                  color="warn" 
                  (click)="delete(e.id)">
            Delete
          </button>
        </td>
      </ng-container>

      <tr mat-header-row 
          *matHeaderRowDef="displayedColumns"></tr>

      <tr mat-row 
          *matRowDef="let row; columns: displayedColumns;">
      </tr>
    </table>
  `
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText = '';

  displayedColumns: string[] = [
    'name',
    'email',
    'department',
    'actions'
  ];

  constructor(
    private service: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  // ✅ FIXED METHOD
  loadEmployees() {
    this.service.getEmployees().subscribe(data => {
      this.employees = data;
       console.log('API DATA:', data);

      // ⭐ FIXED: create new array reference
      this.filteredEmployees = [...data];
    });
  }

  // Proper filtering without destroying original data
  filterEmployees() {

    const search = this.searchText?.trim().toLowerCase();

    if (!search) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    this.filteredEmployees = this.employees.filter(e =>
      (e.department ?? '').toLowerCase().includes(search)
    );
  }

  // Delete with snackbar
  delete(id: number) {
    this.service.deleteEmployee(id).subscribe(() => {

      this.snackBar.open(
        'Employee Deleted Successfully!',
        'Close',
        { duration: 3000 }
      );

      this.loadEmployees();
    });
  }
}