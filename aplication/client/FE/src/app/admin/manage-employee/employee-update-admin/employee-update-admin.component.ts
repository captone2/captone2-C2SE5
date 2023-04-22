import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeAccountService} from '../../../services/employee-account.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {compareValidator} from '../validateCustomEmployee/ConfirmedValidator';

@Component({
  selector: 'app-employee-update-admin',
  templateUrl: './employee-update-admin.component.html',
  styleUrls: ['./employee-update-admin.component.css']
})
export class EmployeeUpdateAdminComponent implements OnInit {

  clickSubmit = false;
  idEmployee: number;
  employeeUpdateForm: FormGroup;
  filePath: string = null;
  inputImage: any = null;
  id: number;
  defaultImage = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeAccountService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) {
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
      {type: 'required', message: 'Ngày sinh không được để trống!'}
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
      {type: 'pattern', message: 'Số CMND gồm 9 số.'},
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
    this.employeeUpdateForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.pattern(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,32}$/)
      ]),
      accountCode: this.formBuilder.control('', [Validators.required, Validators.pattern(/NV-\d{4}/)]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)]),
      matchingPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
        compareValidator('password')]),
      fullname: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/)
      ]),
      birthday: this.formBuilder.control('', [Validators.required]),
      idCard: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')
      ]),
      address: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      phone: this.formBuilder.control('', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
      email: this.formBuilder.control('', [
        Validators.email,
        Validators.required
      ]),
      gender: this.formBuilder.control('', [Validators.required]),
      imageUrl: this.formBuilder.control('', [Validators.required])
    });


    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   // tslint:disable-next-line:radix
    //   this.idEmployee = parseInt(paramMap.get('id'));
    //   this.employeeService.getEmployeeById(this.idEmployee).subscribe((data) => {
    //     // @ts-ignore
    //     this.employee = data;
    //     this.filePath = this.employee.imageUrl;
    //     console.log(this.employeeUpdateForm);
    //     this.employeeUpdateForm.patchValue({
    //       id: this.employee.id,
    //       username: this.employee.username,
    //       accountCode: this.employee.accountCode,
    //       password: this.employee.password,
    //       fullname: this.employee.fullname,
    //       birthday: this.employee.birthday,
    //       idCard: this.employee.idCard,
    //       address: this.employee.address,
    //       phone: this.employee.phone,
    //       email: this.employee.email,
    //       gender: this.employee.gender,
    //       imageUrl: this.employee.imageUrl
    //     });
    //   });
    // });
  }


  selectImage(event) {
    this.inputImage = event.target.files[0];
    this.employeeUpdateForm.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }

  getImageUrl() {
    if (this.filePath != null) {
      return this.filePath;
    }
    return this.defaultImage;
  }


  onSubmit(employeeUpdateForm: FormGroup) {
    this.clickSubmit = true;
    if (this.inputImage != null) {
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            this.employeeService.updateEmployee({...employeeUpdateForm.value, imageUrl: url}).subscribe(
              () => {
                this.router.navigateByUrl('/employee-list').then(
                  r => this.toastrService.success(
                    'Chỉnh sửa thành công',
                    'Thông báo',
                    {timeOut: 5000, extendedTimeOut: 2500})
                );
              },
              (error: HttpErrorResponse) => {
                this.router.navigateByUrl('/employee-list').then(
                  r => this.toastrService.error(
                    'Chỉnh sửa thất bại',
                    'Thông báo',
                    {timeOut: 3000, extendedTimeOut: 1500})
                );
              });
          });
        })
      ).subscribe();
    } else {
      this.employeeService.updateEmployee(employeeUpdateForm.value).subscribe(
        () => {
          this.router.navigateByUrl('/employee-list').then(
            r => this.toastrService.success(
              'Chỉnh sửa thành công',
              'Thông báo',
              {timeOut: 3000, extendedTimeOut: 1500})
          );
        },
        (error: HttpErrorResponse) => {
          this.router.navigateByUrl('/employee-list').then(
            r => this.toastrService.error(
              'Chỉnh sửa thất bại',
              'Thông báo',
              {timeOut: 3000, extendedTimeOut: 1500})
          );
        });
    }

  }

}
