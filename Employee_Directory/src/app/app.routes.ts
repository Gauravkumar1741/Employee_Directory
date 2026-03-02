import { Routes } from '@angular/router';
import { employeeRoutes } from './features/employee/employee.routes';

export const routes: Routes = [
  ...employeeRoutes,
  { path: '', redirectTo: 'employees', pathMatch: 'full' }
];