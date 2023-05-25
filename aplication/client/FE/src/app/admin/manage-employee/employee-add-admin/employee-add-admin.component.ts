import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeAccountService } from '../../../services/employee-account.service';
import { formatDate } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { compareValidator } from '../validateCustomEmployee/ConfirmedValidator';
import { NotifyEmployeeComponent } from '../notifyEmployee/notify-employee/notify-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { checkDateOfBirth } from '../validateCustomEmployee/checkDateOfBirth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AccountEmployeeDTO } from 'src/app/shared/model/dto/AccountEmployeeDTO';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee-add-admin',
  templateUrl: './employee-add-admin.component.html',
  styleUrls: ['./employee-add-admin.component.css']
})
export class EmployeeAddAdminComponent implements OnInit {
  uploadedAvatar = null;
  urlNoPoster = 'https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/wallpaper-for-facebook-profile-photo-e1440624505574.jpg?alt=media&token=986ad864-f3f1-4664-9e30-44b1bbd1f404'
  isSuccessful = false;
  isSignUpFailed = false;
  employeeCreateForm: FormGroup;
  filePath: string = null;
  inputImage: any = null;
  defaultImage = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';
  clickSubmit = false;
  errorMessage = '';


  constructor(
    private employeeAccount: EmployeeAccountService,
    private http: HttpClient,
    private employeeAccountService: EmployeeAccountService,
    private toastService: ToastrService,
    private router: Router,
    private form: FormBuilder,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    public dialog: MatDialog) {
  }

  validationMessage = {

    fullname: [
      { type: 'required', message: 'First and last name cannot be left blank!' },
      { type: 'maxlength', message: 'First and last name up to 100 characters' },
      { type: 'pattern', message: 'First and last name do not contain numbers or special characters' }
    ],
    birthday: [
      { type: 'required', message: 'Date of birth cannot be blank!' },
    ],
    idCard: [
      { type: 'required', message: 'Please enter the CCCD number.' },
      { type: 'pattern', message: 'CCCD number consists of 12 digits.' },
    ],

    phone: [
      { type: 'required', message: 'Please enter the phone number.' },
      { type: 'pattern', message: 'Please enter the phone number in the correct format.' }
    ],

    email: [
      { type: 'required', message: 'Email cannot be blank!' },
      { type: 'email', message: 'Email invalidate' }
    ],



    password: [
      { type: 'required', message: 'Password can not be blank!' },
      { type: 'pattern', message: 'The password is not in the correct format.' }
    ],


    gender: [
      { type: 'required', message: 'Gender cannot be left blank!' }
    ],



    address: [
      { type: 'required', message: 'The address cannot be left blank!' },
      { type: 'maxlength', message: 'Addresses up to 50 characters.' },
      { type: 'pattern', message: 'Do not enter special characters. (!@#$%^&)' }
    ],
  };


  ngOnInit(): void {
    this.employeeCreateForm = this.form.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.maxLength(100)]],
      birthday: ['', [Validators.required]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'),
      ]],
      email: ['', [Validators.email,
      Validators.required]],
      gender: ['1'],
      password: ['', [ Validators.required, Validators.pattern('^(?=^.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#=?^&])[A-Za-z\\d@$!=%*#^?&]{8,20}$')]],

    });
  }

  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    const type = event.target.files[0].type;
    console.log(type)
    if (type !== 'image/jpeg' && type !== 'image/png') {
      console.log("Lỗi")
      this.toastService.error('The requested file format is incorrect!', 'Error: ');
    } else {
      if (this.uploadedAvatar) {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedAvatar);
        reader.onload = (e: any) => {
          this.urlNoPoster = e.target.result;
        };
      }
    }
  }

  onSubmitCreate() {
    console.log("Create")
    const employee = new AccountEmployeeDTO();
    employee.fullname = this.employeeCreateForm.value.fullname;
    employee.birthday = this.employeeCreateForm.value.birthday;
    employee.idCard = this.employeeCreateForm.value.idCard;
    employee.address = this.employeeCreateForm.value.address;
    employee.phone = this.employeeCreateForm.value.phone;
    employee.email = this.employeeCreateForm.value.email;
    employee.gender = this.employeeCreateForm.value.gender;
    employee.password = this.employeeCreateForm.value.password;



    // Upload img & download url
    if (this.uploadedAvatar !== null) {
      console.log("Có poster")
      console.log(employee)
      const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
      const fileRef = this.storage.ref(avatarName);
      this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            employee.imageUrl = url;
            this.addEmployee(employee).subscribe(
              (data) => {
                this.toastService.success('Add new successful!', 'Success: ');
                this.ngOnInit();
                this.router.navigateByUrl('/admin/employee')
              },
              (error: HttpErrorResponse) => {
                this.toastService.error('Add new fail!', 'Error: ');
              }
            );
          });
        })
      ).subscribe();
    } else {
      console.log("Không có poster")
      employee.imageUrl = this.urlNoPoster;
      this.addEmployee(employee).subscribe(
        (data) => {
          this.toastService.success('Add new successful!', 'Success: ');
          this.router.navigateByUrl('/admin/employee')
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Add new fail!', 'Error: ');
        }
      );
    }

  }


  addEmployee(employee: AccountEmployeeDTO): Observable<any> {
    const url = `http://localhost:8080/api/employee-account-create`;
    return this.http.post(url, employee);
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }

  // onSubmit(employeeCreateForm: FormGroup): any {
  //   this.clickSubmit = true;
  //   console.log(this.filePath);
  //   if (employeeCreateForm.get('email').value != null) {
  //     this.employeeAccountService.checkEmail(employeeCreateForm.get('email').value).subscribe(email => {
  //       console.log(email);
  //       if (email === true) {
  //         this.notification('Email đã tồn tại');
  //         this.router.navigateByUrl('/employee-create');
  //         // stop();
  //       }else {
  //         if (employeeCreateForm.get('accountCode').value != null) {
  //           this.employeeAccountService.checkAccountCode(employeeCreateForm.get('accountCode').value).subscribe(accountCode => {
  //             console.log(accountCode);
  //             if (accountCode === true) {
  //               this.notification('Mã nhân viên đã tồn tại');
  //               // stop();
  //             }else{
  //               if (employeeCreateForm.get('username').value != null) {
  //                 this.employeeAccountService.checkUsername(employeeCreateForm.get('username').value).subscribe(username => {
  //                   console.log(username);
  //                   if (username === true) {
  //                     this.notification('Tên tài khoảng đã tồn tại');
  //                     // stop();
  //                   }else {
  //                     const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
  //                     const fileRef = this.storage.ref(imageName);
  //                     this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
  //                       finalize(() => {
  //                         fileRef.getDownloadURL().subscribe((url) => {
  //                           this.employeeCreateForm.patchValue({imageUrl: url});

  //                           this.employeeAccountService.createEmployeeAccount(employeeCreateForm.value).subscribe(data => {
  //                               // this.employeeCreateForm = data;
  //                               this.isSuccessful = true;
  //                               this.isSignUpFailed = false;
  //                               this.notification('Đăng kí thành công!');
  //                               this.router.navigateByUrl('employee-list');
  //                             }
  //                           );
  //                         });
  //                       })
  //                     ).subscribe();
  //                   }
  //                 });
  //               }
  //             }
  //           });
  //         }
  //       }
  //     });
  //   }
  // }
}
