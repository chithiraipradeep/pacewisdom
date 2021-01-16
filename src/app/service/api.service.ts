import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "https://6001b95708587400174db50a.mockapi.io/api/pace/";
  employee_id:any;
  constructor(private http: HttpClient) { }

  add_employee(param) {
    return this.http.post(this.url + 'employee_add', param, {});
  }

  get_employee() {
    return this.http.get(this.url + 'employee_add');
  }

  get_employee_by_id(id){
    return this.http.get(this.url + 'employee_add/'+id);
  }

}
