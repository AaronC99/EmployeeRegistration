import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../employee';

export interface EmployeeData {
  fname: string;
  lname: string;
  email: string;
  dob: Date;
}
const ELEMENT_DATA: EmployeeData[]=[];

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns:string[]=['fname','lname','email','dob'];
  dataSource = ELEMENT_DATA;
  loading = true;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  public getEmployeeData(){
    this.dataService.fetchEmployees.subscribe(data => {
      this.dataSource = data;
    });
  }

}
