import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-list',
    pathMatch: 'full'
  },
  {
    path: 'employee-list',
    loadChildren: () => import('./employee-list/employee-list.module').then( m => m.EmployeeListPageModule)
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  },
  {
    path: 'employee-detail',
    loadChildren: () => import('./employee-detail/employee-detail.module').then( m => m.EmployeeDetailPageModule)
  },
  {
    path: 'employee-address',
    loadChildren: () => import('./employee-address/employee-address.module').then( m => m.EmployeeAddressPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
