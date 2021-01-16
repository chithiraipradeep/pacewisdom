import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
})
export class EmployeeDetailPage implements OnInit {
  employee:any=[];
  constructor(
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private apiservice: ApiService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    let employee_id=this.apiservice.employee_id;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.apiservice.get_employee_by_id(employee_id)
    .subscribe((data:any)=>{
      this.employee=data;
      loading.dismiss();
      console.log(this.employee);
    },(err:any)=>{
      loading.dismiss();
      console.log(err.message);
    })
  }

  
}
