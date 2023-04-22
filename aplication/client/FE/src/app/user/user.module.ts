import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingUserComponent} from './booking-user/booking-user.component';
import {AccountUserComponent} from './account-user/account-user.component';
import {UpdateAccountUserComponent} from './account-user/update-account-user/update-account-user.component';
import {ManageBookingUserComponent} from './account-user/manage-booking-user/manage-booking-user.component';
import {HistoryPointUserComponent} from './account-user/history-point-user/history-point-user.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChangePasswordComponent} from './account-user/change-password/change-password.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ResetPasswordComponent } from './account-user/reset-password/reset-password.component';
import { VerifyResetPasswordComponent } from './account-user/verify-reset-password/verify-reset-password.component';
import { VerificationComponent } from './account-user/verification/verification.component';
import {ConfirmBookingComponent} from './booking-user/confirm-booking/confirm-booking.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgxPayPalModule } from 'ngx-paypal';


const userRoutes: Routes = [
  // {
  //   path: 'booking', component: BookingUserComponent
  // },
  {
    path: 'confirm-booking', component: ConfirmBookingComponent
  },
  {
    path: 'updateAccount/:idUpdate', component: UpdateAccountUserComponent
  },
  {
    path: 'changePassword/:idUpdate', component: ChangePasswordComponent
  },
  {
    path: 'manageBookingUser/:idAccount', component: ManageBookingUserComponent
  },
  {path: 'reset-password', component: ResetPasswordComponent},

  {path: 'verify-reset-password', component: VerifyResetPasswordComponent},

  {path: 'verification', component: VerificationComponent},
];

@NgModule({
  declarations: [
    BookingUserComponent,
    AccountUserComponent,
    UpdateAccountUserComponent,
    ManageBookingUserComponent,
    HistoryPointUserComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    VerifyResetPasswordComponent,
    VerificationComponent,
    ConfirmBookingComponent
  ],
  exports: [
    UpdateAccountUserComponent,
    AccountUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatRadioModule,
    NgxPayPalModule
  ]
})
export class UserModule {
}
