import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {AccountUserServiceService} from '../../../services/account-user-service.service';
import {Account} from '../../../shared/model/entity/Account';

@Component({
  selector: 'app-manage-booking-user',
  templateUrl: './manage-booking-user.component.html',
  styleUrls: ['./manage-booking-user.component.css']
})
export class ManageBookingUserComponent implements OnInit {
  idAccount: any;
  filePath: string = null;
  inputImage: any = null;
  accountUpdate: Account;
  account: Account[];
  name: any;
  totalpoint: any;
  url: any;
  page = 1;

  defaultImage = 'https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png';

  constructor(private accountService: AccountUserServiceService,
              private  toastrService: ToastrService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  accountUpdateForm = this.formBuilder.group({
    imageUrl: [''],
    totalPoint: [('')],
    fullname: [('')],
  });


  ngOnInit(): void {

    this.idAccount = this.activatedRoute.snapshot.params.idAccount;
    console.log(this.idAccount);
    this.accountService.findAccountUserId(this.idAccount).subscribe((data) => {
      console.log(this.idAccount);
      this.accountUpdate = data;
      this.accountUpdateForm = this.formBuilder.group({
        imageUrl: [this.accountUpdate.imageUrl],
        totalPoint: [this.accountUpdate.totalPoint],
        fullname: [this.accountUpdate.fullname],
      });
      this.name = this.accountUpdate.fullname;
      this.totalpoint = this.accountUpdate.totalPoint;
    });
    
  }

  // managerBooking() {
  //   this.accountService.findBooking().subscribe(data => {
  //     this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
  //         this.idAccount = (paramMap.get('idAccount'));
  //         // tslint:disable-next-line:no-shadowed-variable
  //         this.accountService.findAllByIdBooking(this.idAccount).subscribe((data) => {
  //           if (data.length === 0) {
  //             this.toastrService.info('Bạn chưa đặt vé nào cả', 'Thông Báo');
  //           }
  //           this.booking = data;
  //           console.log(this.booking[0].received);
  //         });
  //       }
  //     );
  //   });
  // }

  // getImageUrl() {
  //   if (this.filePath != null) {
  //     return this.filePath;
  //   }
  //   if (this.accountUpdateForm.value.imageUrl != null) {
  //     return this.accountUpdateForm.value.imageUrl;
  //   } else {
  //     return this.defaultImage;
  //   }
  // }

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
