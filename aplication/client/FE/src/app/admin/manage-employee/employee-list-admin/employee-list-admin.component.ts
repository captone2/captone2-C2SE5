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
    page: 1;
    keyWord = null;
  constructor( private employeeAccountService: EmployeeAccountService ,
               private dialog: MatDialog,
               private toastService: ToastrService,
               private jsogService: JsogService) { }


  ngOnInit(): void {
    this.employeeAccountService.getAllEmployee().subscribe((data) => {
     // @ts-ignore
      this.employeeList = this.jsogService.deserializeArray(data, Account) ;
      console.log(data);
    });
  }

  openDialogDelete(id) {
    this.employeeAccountService.getEmployeeById(id).subscribe(data => {
      // console.log(data);
      const dialogRef = this.dialog.open(EmployeeDeleteAdminComponent, {
        width: '500px',
        data: {data1: data},
        disableClose: true

      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  searchKeyWord(){
    console.log(this.keyWord);
    this.employeeAccountService.searchEmployee(this.keyWord).subscribe((data) => {
      console.log(data);
      this.employeeList = data ;
      this.page = 1;
      if (this.employeeList.length === 0) {
        this.toastService.error('Không tìm thấy', 'Thông báo');
      }
    });

  }
}
