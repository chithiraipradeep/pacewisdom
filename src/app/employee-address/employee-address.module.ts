import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeAddressPageRoutingModule } from './employee-address-routing.module';

import { EmployeeAddressPage } from './employee-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeAddressPageRoutingModule
  ],
  declarations: [EmployeeAddressPage]
})
export class EmployeeAddressPageModule {}
