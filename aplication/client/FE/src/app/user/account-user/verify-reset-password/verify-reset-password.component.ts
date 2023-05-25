import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/authe.service';
import {compareValidator} from '../Validator_User/validatePassword';

@Component({
  selector: 'app-verify-reset-password',
  templateUrl: './verify-reset-password.component.html',
  styleUrls: ['./verify-reset-password.component.css']
})
export class VerifyResetPasswordComponent implements OnInit {
  isSuccessful = true;
  isSendMail: boolean;
  isSubmited: true;
  code: string;
  formResetPassword: FormGroup;
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formResetPassword = this.formBuilder.group({
      passwordGroup: this.formBuilder.group({
        // tslint:disable-next-line:max-line-length
        newPassword: ['', [Validators.required, Validators.pattern('^(?=^.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#=?^&])[A-Za-z\\d@$!=%*#^?&]{8,20}$')]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: this.comparePassword}),
    });
    this.route.queryParams.subscribe(params => {
      const code = params.code;
      if (code == null) {
        this.isSendMail = false;
      } else {
        this.isSendMail = true;
        this.isSuccessful = false;
        this.authService.verifyPassword(code).subscribe(
          data => {
            this.isSuccessful = (data.message === 'accepted');
          },
          err => {
            this.isSuccessful = false;
          }
        );
      }
    });
  }


  onSubmit() {
    console.log(this.formResetPassword.value.passwordGroup.newPassword);
    console.log(this.formResetPassword.value.passwordGroup.confirmPassword);
    if (this.formResetPassword.value.passwordGroup.newPassword === this.formResetPassword.value.passwordGroup.confirmPassword) {
      this.route.queryParams.subscribe(params => {
        this.code = params.code;
      });
      this.authService.doResetPassword(this.formResetPassword.value.passwordGroup.newPassword, this.code).subscribe(data => {
        this.toastr.success('Password has been changed!', 'Success: ');
        this.router.navigateByUrl('/login');
      });
    } else {
      this.toastr.error('Enter verify password does not match!', 'Error: ');
    }
  }

  comparePassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return (value.newPassword === value.confirmPassword) ? null : {invalidConfirmation: true};
  }
}
