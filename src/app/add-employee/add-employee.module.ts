import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddEmployeePageRoutingModule } from './add-employee-routing.module';
import { AddEmployeePage } from './add-employee.page';
import { MaterialModule } from 'src/app/material.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    AddEmployeePageRoutingModule
  ],
  declarations: [AddEmployeePage]
})
export class AddEmployeePageModule { }
