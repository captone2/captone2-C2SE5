import {Component, Inject, OnInit} from '@angular/core';
import {AccountUserServiceService} from '../../../services/account-user-service.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {Account} from '../../../shared/model/entity/Account';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {checkDateOfBirth} from '../Validator_User/validatorBirthday';
import {compareValidator} from '../Validator_User/validatePassword';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private  accountUserService: AccountUserServiceService,
              private  toastrService: ToastrService,
              private router: Router,
              private  formBuilder: FormBuilder,
              private  activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }


  filePath: string = null;
  inputImage: any = null;
  accountUpdate: Account;
  idUpdate: number;
  name: any;
  totalpoint: any;
  url: any;
  pass: any;
  defaultImage = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';

  validationMessage = {
    password: [
      {type: 'required', message: 'Mật khẩu không được để trống.'},
      {
        type: 'pattern',
        message: 'Vui lòng nhập mật khẩu đúng định dạng trên 8 ký tự gồm chữ hoa,thường và ký tự đặc biệt.'
      },
    ],
    newPassword: [
      {type: 'required', message: 'Mật khẩu không được để trống.'},
      {type: 'compare', message: 'Mật khẩu mới không được trùng với mật khẩu cũ.'},
      {
        type: 'pattern',
        message: 'Vui lòng nhập mật khẩu đúng định dạng trên 8 ký tự gồm chữ hoa,thường và ký tự đặc biệt.'
      }
    ],
    confirmPassword: [
      {type: 'required', message: 'Mật khẩu không được để trống.'},
      {type: 'compare', message: 'Mật khẩu không khớp xin vui lòng thử lại.'},
    ]
  };
  accountUpdateForm = this.formBuilder.group({
    id: [('')],
    accountCode: [('')],
    username: [('')],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$')]],
    // tslint:disable-next-line:max-line-length
    newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$')]],
    totalPoint: [('')],
    fullname: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/), Validators.minLength(4), Validators.maxLength(20)]],
    birthday: [(''), [Validators.required]],
    gender: [(''), [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
    idCard: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern('^[0-9]{1,10}$')]],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]{1,10}$')]],
    address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    imageUrl: [''],
    // tslint:disable-next-line:max-line-length
    confirmPassword: ['', [Validators.required, compareValidator('newPassword')]],
  });

  ngOnInit(): void {
    this.idUpdate = this.activatedRoute.snapshot.params.idUpdate;
    console.log(this.idUpdate);
    this.accountUserService.findAccountUserId(this.idUpdate).subscribe((data) => {
      this.accountUpdate = data;

      this.accountUpdateForm = this.formBuilder.group({
          id: [(this.accountUpdate.id)],
          accountCode: [this.accountUpdate.accountCode],
          username: [this.accountUpdate.username],
          // tslint:disable-next-line:max-line-length
          password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$')]],
          newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$')]],
          totalPoint: [this.accountUpdate.totalPoint],
          fullname: [this.accountUpdate.fullname, [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/), Validators.minLength(3), Validators.maxLength(250)]],
          birthday: [this.accountUpdate.birthday, [Validators.required, checkDateOfBirth]],
          gender: [this.accountUpdate.gender],
          email: [this.accountUpdate.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
          idCard: [this.accountUpdate.idCard, [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern('^[0-9]{1,10}$')]],
          phone: [this.accountUpdate.phone, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]{1,10}$')]],
          address: [this.accountUpdate.address, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
          imageUrl: [this.accountUpdate.imageUrl],
          confirmPassword: ['', [Validators.required, compareValidator('newPassword')]],
        },
      );

      this.name = this.accountUpdate.fullname;
      this.totalpoint = this.accountUpdate.totalPoint;
      console.log(data);
    });


  }

  get f() {
    return this.accountUpdateForm.controls;
  }

  getImageUrl() {
    if (this.filePath != null) {
      return this.filePath;
    }
    if (this.accountUpdateForm.value.imageUrl != null) {
      return this.accountUpdateForm.value.imageUrl;
    } else {
      return this.defaultImage;
    }
  }

  changepassword() {
    console.log(this.accountUpdateForm.get('newPassword').value);
    this.accountUpdateForm.patchValue({password: this.accountUpdateForm.get('newPassword').value});
    console.log(this.accountUpdateForm.get('password').value);
    if (this.inputImage != null) {
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.accountUserService.updateAccountUser({...this.accountUpdateForm.value, imageUrl: url}).subscribe(
              () => {

                this.router.navigateByUrl('updateAccount/' + this.idUpdate).then(
                  r => this.toastrService.success(
                    'Chỉnh sửa thành công',
                    'Thông báo',
                    {timeOut: 3000, extendedTimeOut: 1500})
                );
              },
              (error: HttpErrorResponse) => {
                this.router.navigateByUrl('updateAccount/' + this.idUpdate).then(
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
      if (this.accountUpdateForm.invalid) {
        this.toastrService.error('Bạn đã  Cập nhận thông tin tài khoản không thành công!', 'Thông báo');
        return;
      }
      this.accountUserService.updateAccountUser(this.accountUpdateForm.value).subscribe((data) => {
        this.toastrService.success('Bạn đã  Cập nhận thông tin tài khoản  thành công!', 'Thông báo');
        this.router.navigateByUrl('updateAccount/' + this.idUpdate);
      });
    }
  }

  selectImage(event) {
    this.inputImage = event.target.files[0];
    this.accountUpdateForm.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }
}
