import { Component, OnInit } from '@angular/core';
import {EmployeeAccountService} from '../../../services/employee-account.service';
import {Account} from '../../../shared/model/entity/Account';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeDeleteAdminComponent} from '../employee-delete-admin/employee-delete-admin.component';
import {ToastrService} from 'ngx-toastr';
import {JsogService} from 'jsog-typescript';

@Component({
  selector: 'app-employee-list-admin',
  templateUrl: './employee-list-admin.component.html',
  styleUrls: ['./employee-list-admin.component.css']
})
export class EmployeeListAdminComponent implements OnInit {
    employeeList: Account[];
    employeeDelete: Account;
    keyWord = null;
    pageSize: number = 5; 
    currentPage: number = 1; 
  constructor( private employeeAccountService: EmployeeAccountService ,
               private dialog: MatDialog,
               private toastService: ToastrService,
               private jsogService: JsogService) { }


  ngOnInit(): void {
    this.employeeAccountService.getAllEmployee().subscribe((data) => {
    this.employeeList = data;
    console.log(data)
    });
  }

 

  searchKeyWord(){
    console.log(this.keyWord);
    this.employeeAccountService.searchEmployee(this.keyWord).subscribe((data) => {
      console.log(data);
      this.employeeList = data ;
      // this.page = 1;
      if (this.employeeList.length === 0) {
        this.toastService.error('Không tìm thấy', 'Thông báo');
      }
    });

  }
  setEmployeeDelete(employee: Account) {
    this.employeeDelete = employee;
  }

  deleteEmployee(id: number) {
    
    this.employeeAccountService.deleteEmployee(id).subscribe((data) => {   
      this.toastService.success('Delete employee successfully!', 'Success:');
      this.ngOnInit();
    },(error) => {
      this.toastService.success('Delete employee unsuccessfully!', 'Error:');
    });
   }
}
