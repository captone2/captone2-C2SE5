import {Component, Inject, OnInit} from '@angular/core';
import {AccountUserServiceService} from '../../../services/account-user-service.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../shared/model/entity/Account';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {checkDateOfBirth} from '../Validator_User/validatorBirthday';
import {compareValidator} from '../Validator_User/validatePassword';

@Component({
  selector: 'app-update-account-user',
  templateUrl: './update-account-user.component.html',
  styleUrls: ['./update-account-user.component.css']
})
export class UpdateAccountUserComponent implements OnInit {


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
  account: Account[];
  uploading: boolean;
  idUpdate: number;
  name: any;
  totalpoint: any;
  url: any;
  defaultImage = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';

  validationMessage = {
    fullname: [
      {type: 'required', message: 'Họ và tên không được để trống.'},
      {type: 'minlength', message: 'Họ và têntối thiểu 4 ký tự.'},
      {type: 'maxlength', message: 'Họ và tên tối đa 20 ký tự.'},
      {type: 'pattern', message: 'Họ và tên không chứa dấu ký tự đặc biệt hoặc Số.'}
    ],
    birthday: [
      {type: 'required', message: 'Vui lòng chọn ngày sinh, không được để trống.'},
      {type: 'checkAge', message: 'Tuổi phải trên 14 tuổi.'}
    ],
    gender: [
      {type: 'required', message: 'Vui lòng chọn giới tính.'},
    ],
    password: [
      {type: 'compare', message: 'pass trùng với mk cũ'},
    ],
    email: [
      {type: 'required', message: 'Email không được để trống.'},
      {type: 'email', message: 'Email không đúng định dạng.'},
      {type: 'pattern', message: 'Email có  định dạng là abcd@gmail.com.'}
    ],
    idCard: [
      {type: 'required', message: 'CMND không được để trống.'},
      {type: 'pattern', message: 'không được nhập chữ và số điện thoại có 12 số.'},
      {type: 'minlength', message: 'CMND có  12 số.'},
      {type: 'maxlength', message: 'CMND có  12 số.'},
    ],
    phone: [
      {type: 'minlength', message: 'Số điện thoại có  10 số.'},
      {type: 'required', message: 'Số điện thoại không được để trống.'},
      {type: 'maxlength', message: 'Số điện thoại có 10 kí tự.'},
      {type: 'pattern', message: 'Số điện thoại không hợp lệ.'},
    ],
    address: [
      {type: 'required', message: 'Đia chỉ không được để trống.'},
      {type: 'minlength', message: 'Địa chỉ tối thiểu 4 ký tự.'},
      {type: 'maxlength', message: 'Địa chỉ tối đa 20 ký tự.'},
    ],
    imageUrl: [
      {type: 'pattern', message: 'Chỉ chấp nhận file jpg, png, jpeg'}
    ]
  };

  accountUpdateForm = this.formBuilder.group({
    id: [('')],
    accountCode: [('')],
    username: [('')],
    password: [(''), ],
    totalPoint: [('')],
    fullname: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/), Validators.minLength(4), Validators.maxLength(20)]],
    birthday: [(''), [Validators.required]],
    gender: [(''), [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
    idCard: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(/^[0-9]{1,12}$/)]],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/)]],
    address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    imageUrl: [''],
  });

  ngOnInit(): void {
    this.idUpdate = this.activatedRoute.snapshot.params.idUpdate;
    console.log(this.idUpdate);
    this.accountUserService.findAccountUserId(this.idUpdate).subscribe((data) => {
      this.accountUpdate = data;

      this.accountUpdateForm = this.formBuilder.group({
        id: [(this.accountUpdate.id)],
        // accountCode: [this.accountUpdate.accountCode],
        username: [this.accountUpdate.username],
        password: [this.accountUpdate.password ],
   /*     password: [this.accountUpdate.password, compareValidator('12345')],*/
        totalPoint: [this.accountUpdate.totalPoint],
        fullname: [this.accountUpdate.fullname, [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/), Validators.minLength(3), Validators.maxLength(250)]],
        birthday: [this.accountUpdate.birthday, [Validators.required,  checkDateOfBirth]],
        gender: [this.accountUpdate.gender],
        email: [this.accountUpdate.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
        idCard: [this.accountUpdate.idCard, [Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(/^[0-9]{1,12}$/)]],
        phone: [this.accountUpdate.phone, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/)]],
        address: [this.accountUpdate.address, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        imageUrl: [this.accountUpdate.imageUrl],
      });
      this.name = this.accountUpdate.fullname;
      this.totalpoint = this.accountUpdate.totalPoint;

    });


  }

  getImageUrl(){
    if (this.filePath != null){
      return this.filePath;
    }
    if (this.accountUpdateForm.value.imageUrl != null){
      return this.accountUpdateForm.value.imageUrl;
    } else {return this.defaultImage; }
  }

  updateAccount() {
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
  /*uploadImage(){
    this.storage.upload('/files' + Math.random() + this.inputImage, this.inputImage);
  }*/
}





