import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAddressPage } from './employee-address.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeAddressPageRoutingModule {}
