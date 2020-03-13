import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API = 'http://localhost:3000';
  private _employeeSubject: BehaviorSubject<any[]>;

  constructor(private httpClient: HttpClient) {
    this._employeeSubject = new BehaviorSubject([]);
    this.getEmployeeData();
   }

   getEmployeeData = async () => {
    const employees =  await this.httpClient.get<[]>(`${this.REST_API}/api/employee`).toPromise();
    this._employeeSubject.next(employees);
   }

   get fetchEmployees() {
    return this._employeeSubject.asObservable();
  }

  createEmployee = (value) => {
    this.httpClient.post('http://localhost:3000/api/employee',value).subscribe((res:Employee)=>{  
      console.log(res.fname,res.lname,res.email,res.dob.toString());
      this.getEmployeeData();
    });
  }
  // promiseSample = ():Promise<any> =>{
  //   return new Promise(resolve=>{
  //     resolve('hi');
  //   });
  // }
  // sample = async () => {
  //   this.getHeroes().subscribe(data => {
  //     data.forEach(hero => this.deletehero(hero));     
  //   },(err) => {
  //     console.log(err);
  //   });
  // }
  // this.getHeroes();

}
