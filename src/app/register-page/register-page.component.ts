import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  model = new Employee ('','','', new Date());
  employeesFound:Employee[];
  events:string[]=[];
  startDate = new Date(1990, 0, 1);

  registerForm = new FormGroup ({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl('')
  });
  constructor(
    private formBuilder:FormBuilder,
    private dataService: DataService,
    private http: HttpClient,
    private router: Router) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      fname: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      lname: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,Validators.email]],
      dob: ['',[Validators.required]]
    });
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.model.dob = event.value;
    // this.events.push(`${type}: ${event.value}`);
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.table(this.registerForm.value);
    //console.log(this.model);
    this.dataService.createEmployee(this.registerForm.value);
  }
  public getEmployeeData(){
    this.dataService.fetchEmployees.subscribe(data =>{
      this.employeesFound = data;
    });
  }
}
