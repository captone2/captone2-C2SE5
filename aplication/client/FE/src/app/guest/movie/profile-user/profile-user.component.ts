import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountUserServiceService } from 'src/app/services/account-user-service.service';
import { BookingService } from 'src/app/services/booking.service';
import { Password } from 'src/app/shared/model/dto/Password';
import { Account } from 'src/app/shared/model/entity/Account';
import { Booking } from 'src/app/shared/model/entity/Booking';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  bookingList: Booking[] = [];
  account: Account;
  passwordForm: FormGroup;
  accountId: number;
  updatePassword: Password = {};
  constructor(private toastr: ToastrService , private router: Router, private fb: FormBuilder, private bookingService: BookingService, private accountService: AccountUserServiceService) { }

  ngOnInit(): void {

    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      passwordGroup: this.fb.group({
        // tslint:disable-next-line:max-line-length
        newPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,13}$')]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: this.comparePassword}),
    });



  this.getListBooking();
  this.getUserById();
  }
   
   getListBooking() {
    const user = JSON.parse(sessionStorage.getItem('auth-user'))
    const id = user.id;
    this.bookingService.getListBookingByAccountId(id).subscribe(data => {
      this.bookingList = data
      console.log(data)
    })
   }


   changePassword() {
    this.updatePassword.oldPassword = this.passwordForm.value.oldPassword;
    this.updatePassword.newPassword = this.passwordForm.value.passwordGroup.newPassword;
    this.updatePassword.confirmPassword = this.passwordForm.value.passwordGroup.confirmPassword;
    const user = JSON.parse(sessionStorage.getItem('auth-user'))
    const id = user.id;
    console.log(this.updatePassword);
    this.accountService.updatePassword(id, this.updatePassword).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
        this.toastr.success('Password update successful!', 'Success: ');
      },
      (error) => {
          this.toastr.error('Please check the information again!', 'Error: ');
      },
    );
  }



 getUserById() {
    const user = JSON.parse(sessionStorage.getItem('auth-user'))
    const id = user.id;
    this.accountService.findAccountId(id).subscribe(data => {
      this.account = data
    })
  }
 

  convertSeat(arr :any) {
    return arr.map(any => any.name).join(', ');
  }

  comparePassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return (value.newPassword === value.confirmPassword) ? null : {invalidConfirmation: true};
  }
}
