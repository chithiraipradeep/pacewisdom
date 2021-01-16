import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, ModalController } from "@ionic/angular";
import { EmployeeAddressPage } from '../employee-address/employee-address.page';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  hide: boolean = true;
  validations_form: FormGroup;
  imageSrc: any;
  device_lat: any;
  device_lng: any;
  constructor(private navCtrl: NavController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private apiservice: ApiService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      employee_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      employee_gender: new FormControl('', Validators.compose([
        Validators.required
      ])),
      employee_email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ])),
      employee_phoneno: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      employee_address: new FormControl('', Validators.compose([
        Validators.required
      ])),
      file: new FormControl('', Validators.compose([
        Validators.required
      ])),
      employee_image: new FormControl('', Validators.compose([
      ])),
    });
  }

  validation_messages = {
    employee_name: [
      { type: 'required', message: 'Employee name is required.' },
      { type: 'pattern', message: 'Enter text only' }
    ],
    employee_gender: [
      { type: 'required', message: 'Employee gender is required.' },
    ],
    employee_email: [
      { type: 'required', message: 'Employee email is required.' },
      { type: 'pattern', message: 'Employee email is not valid' },
    ],
    employee_phoneno: [
      { type: 'required', message: 'Employee phone number is required.' },
      { type: 'minlength', message: 'phone number must be 10 digit' },
      { type: 'manlength', message: 'phone number must be 10 digit' },
      { type: 'pattern', message: 'Enter numbers only' },
    ],
    employee_address: [
      { type: 'required', message: 'Employee address is required.' }
    ],
    file: [
      { type: 'required', message: 'Employee image is required.' }
    ]

  };


  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.validations_form.patchValue({
          employee_image: this.imageSrc
        })

      };

    }
  }

  async getaddress() {
    const modal = await this.modalController.create({
      component: EmployeeAddressPage,
      animated: true,
      cssClass: 'my-custom-modal-css',
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data.data.data != true) {
        this.validations_form.patchValue({
          employee_address: data.data.data.address
        });
        this.device_lat = data.data.data.lat;
        this.device_lng = data.data.data.lng;
      }
    });

    return await modal.present();
  }


  async onSubmit(value) {
    let param = {
      employee_name: value.employee_name,
      employee_gender: value.employee_gender,
      employee_email: value.employee_email,
      employee_phoneno: value.employee_phoneno,
      employee_address: value.employee_address,
      employee_image: value.employee_image,
      device_lat: this.device_lat,
      device_lng: this.device_lng
    }
    console.log(param);
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.apiservice.add_employee(param)
      .subscribe((data: any) => {
        if (data) {
          loading.dismiss();
          this.presentToast('Employee added successfully');
          this.navCtrl.pop();
        }
        else{
          loading.dismiss();
        }
      }, (err: any) => {
        loading.dismiss();
        this.presentToast(err.message);
      })

  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

}
