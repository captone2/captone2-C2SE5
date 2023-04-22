import {Component, Inject, OnInit} from '@angular/core';
import {ManagerUserService} from '../../../services/manager-user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  public nameMember;
  public idMember;

  constructor(private managerUserService: ManagerUserService ,
              public dialogRef: MatDialogRef<DeleteUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.nameMember = this.data.data1.fullname;
    this.idMember = this.data.data1.id;
  }
  deleteEquipment() {
    this.managerUserService.deleteMember(this.idMember).subscribe((data) => {
      this.dialogRef.close();
      this.toastrService.success('Bạn đã xóa thành công!', 'Thông báo');

    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
