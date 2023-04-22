import { Component, OnInit } from '@angular/core';
import {EmployeeAccountService} from '../../../services/employee-account.service';
import {ActivatedRoute} from '@angular/router';
import {Account} from '../../../shared/model/entity/Account';


@Component({
  selector: 'app-employee-detail-admin',
  templateUrl: './employee-detail-admin.component.html',
  styleUrls: ['./employee-detail-admin.component.css']
})
export class EmployeeDetailAdminComponent implements OnInit {

   employeeDetail: Account;

  constructor(
     private employeeAccountService: EmployeeAccountService,
     private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
    this.employeeAccountService.getEmployeeById(this.activatedRoute.snapshot.params.id).subscribe((data) => {
      this.employeeDetail = data;
      console.log(this.employeeDetail);
    }, error => console.log('error'));
  }

}
