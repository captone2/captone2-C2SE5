import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {EmployeeAccountService} from '../../../services/employee-account.service';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {compareValidator} from '../validateCustomEmployee/ConfirmedValidator';
import {NotifyEmployeeComponent} from '../notifyEmployee/notify-employee/notify-employee.component';
import {MatDialog} from '@angular/material/dialog';
import {checkDateOfBirth} from '../validateCustomEmployee/checkDateOfBirth';


@Component({
  selector: 'app-employee-add-admin',
  templateUrl: './employee-add-admin.component.html',
  styleUrls: ['./employee-add-admin.component.css']
})
export class EmployeeAddAdminComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  employeeCreateForm: FormGroup;
  filePath: string = null;
  inputImage: any = null;
  defaultImage = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';
  clickSubmit = false;
  errorMessage = '';


  constructor(
    private employeeAccountService: EmployeeAccountService,
    private toastrService: ToastrService,
    private router: Router,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    public dialog: MatDialog) {
  }

  validationMessage = {

    accountCode: [
      {type: 'required', message: 'Mã nhân viên không được để trống!'},
      {type: 'pattern', message: 'Mã nhân viên là NV-XXXX.'}
    ],

    username: [
      {type: 'required', message: 'Tên đăng nhập không được để trống!'},
      {type: 'minlength', message: 'Tên đăng nhập tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Tên đăng nhập tối đa 32 ký tự!  '},
      {type: 'pattern', message: 'Tên đăng nhập không chứa  ký tự đặc biệt'}
    ],

    password: [
      {type: 'required', message: 'Mật khẩu không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu tối thiểu 6 ký tự'},
      {type: 'maxlength', message: 'Mật khẩu tối đa 32 ký tự'}
    ],

    matchingPassword: [
      {type: 'required', message: 'Vui lòng nhập xác nhận mật khẩu.'},
      {type: 'minlength', message: 'Mật khẩu tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Mật khẩu tối đa 32 ký tự'}
    ],

    birthday: [
      {type: 'required', message: 'Ngày sinh không được để trống!'},
      {type: 'checkAge', message: 'Tuổi phải trên 16.'}
    ],
    fullname: [
      {type: 'required', message: 'Họ và tên không được để trống!'},
      {type: 'maxlength', message: 'Họ và tên dài tối đa 100 ký tự'},
      {type: 'pattern', message: 'Họ và tên không chứa ký tự số hoặc ký tự đặc biệt'}
    ],
    email: [
      {type: 'required', message: 'Email không được để trống!'},
      {type: 'email', message: 'Email không đúng định dạng'}
    ],
    gender: [
      {type: 'required', message: 'Giới tính không được để trống!'}
    ],
    idCard: [
      {type: 'required', message: 'Vui lòng nhập số CMND.'},
      {type: 'pattern', message: 'Số CMND gồm 12 số.'},
    ],
    address: [
      {type: 'required', message: 'Đia chỉ không được để trống!'},
      {type: 'maxlength', message: 'Địa chỉ tối đa 50 kí tự.'},
      {type: 'pattern', message: 'Không được nhập kí tự đặc biệt. (!@#$%^&)'}
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại.'},
      {type: 'minlength', message: 'Số điện thoại có 10 chữ số'},
      {type: 'maxlength', message: 'Số điện thoại có 10 chữ số'},
      {type: 'pattern', message: 'Vui lòng nhập số điện thoại.'}
    ],
    imageUrl: [
      {type: 'required', message: 'Hình ảnh không được để trống!'}
    ]
  };


  ngOnInit(): void {

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    this.employeeCreateForm = new FormGroup({
        accountCode: new FormControl(null,
          [Validators.required,
            Validators.pattern(/NV-\d{4}/)
          ]),
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,32}$/)
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32)]),
        matchingPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
          compareValidator('password')]),
        fullname: new FormControl(null, [
          Validators.required,
          Validators.maxLength(32),
          Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/)
        ]),
        birthday: new FormControl('', Validators.required),
        idCard: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[0-9]{12}$')
        ]),
        address: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50)
        ]),
        phone: new FormControl(null,
          [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]{10}$')
          ]),
        email: new FormControl(null, [
          Validators.email,
          Validators.required
        ]),
        gender: new FormControl(null,
          [Validators.required]),
        imageUrl: new FormControl(null,
          [Validators.required])
      },
    );
  }


  // submit form
  onSubmit(employeeCreateForm: FormGroup): any {
    this.clickSubmit = true;
    console.log(this.filePath);
    if (employeeCreateForm.get('email').value != null) {
      this.employeeAccountService.checkEmail(employeeCreateForm.get('email').value).subscribe(email => {
        console.log(email);
        if (email === true) {
          this.notification('Email đã tồn tại');
          this.router.navigateByUrl('/employee-create');
          // stop();
        }else {
          if (employeeCreateForm.get('accountCode').value != null) {
            this.employeeAccountService.checkAccountCode(employeeCreateForm.get('accountCode').value).subscribe(accountCode => {
              console.log(accountCode);
              if (accountCode === true) {
                this.notification('Mã nhân viên đã tồn tại');
                // stop();
              }else{
                if (employeeCreateForm.get('username').value != null) {
                  this.employeeAccountService.checkUsername(employeeCreateForm.get('username').value).subscribe(username => {
                    console.log(username);
                    if (username === true) {
                      this.notification('Tên tài khoảng đã tồn tại');
                      // stop();
                    }else {
                      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
                      const fileRef = this.storage.ref(imageName);
                      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
                        finalize(() => {
                          fileRef.getDownloadURL().subscribe((url) => {
                            this.employeeCreateForm.patchValue({imageUrl: url});

                            this.employeeAccountService.createEmployeeAccount(employeeCreateForm.value).subscribe(data => {
                                // this.employeeCreateForm = data;
                                this.isSuccessful = true;
                                this.isSignUpFailed = false;
                                this.notification('Đăng kí thành công!');
                                this.router.navigateByUrl('employee-list');
                              }
                            );
                          });
                        })
                      ).subscribe();
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }


  // lấy và lưu địa chỉ ảnh vào firebase
  selectImage(event) {
    this.inputImage = event.target.files[0];
    this.employeeCreateForm.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }


  // hiển thị ảnh từ firebase
  getImageUrl() {
    if (this.filePath != null) {
      return this.filePath;
    }
    if (this.employeeCreateForm.value.imageUrl != null) {
      return this.employeeCreateForm.value.imageUrl;
    }
    return this.defaultImage;
  }


  notification(message: string) {
    const dialogRef = this.dialog.open(NotifyEmployeeComponent,
      {
        data: {
          message
        },
        width: '400px'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
