import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
})
export class EmployeeListPage implements OnInit {
  employee_list:any;
  constructor(
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private apiservice: ApiService,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.apiservice.get_employee()
    .subscribe((data:any)=>{
      this.employee_list=data;
      loading.dismiss();
      console.log(this.employee_list);
    },(err:any)=>{
      loading.dismiss();
      console.log(err.message);
    })
  }


  add_employee(){
    this.navCtrl.navigateForward('/add-employee')
  }

  employeedetail(id){
    this.apiservice.employee_id=id;
    this.navCtrl.navigateForward('/employee-detail');
  }

}
