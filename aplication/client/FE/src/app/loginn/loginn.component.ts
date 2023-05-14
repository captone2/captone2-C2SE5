import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../common/app.constants';
import { AuthService } from '../services/authe.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationRegisterComponent } from '../guest/register/notification-register/notification-register.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { isBuffer } from 'util';
import { ToastrService } from 'ngx-toastr';

declare const showPassword: any;
@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.component.html',
  styleUrls: ['./loginn.component.css']
})
export class LoginnComponent implements OnInit {


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  constructor(private authService: AuthService, private toastr: ToastrService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    const token: string = this.route.snapshot.queryParamMap.get('token');
    const error: string = this.route.snapshot.queryParamMap.get('error');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    } else if (token) {
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else if (error) {
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
        // redirect to requested page or default page
        const requestedPage = sessionStorage.getItem('requestedPage');
        if (requestedPage) {
          this.router.navigateByUrl(requestedPage);
          sessionStorage.removeItem('requestedPage');
        } else {
          const user = JSON.parse(sessionStorage.getItem('auth-user'))
          console.log(user)
          const role = user.roles;
          if (role.includes("ROLE_ADMIN") || role.includes("ROLE_EMPLOYEE")) {
            console.log("Admin")
            this.router.navigate(['/admin/home']);
          } else{
            console.log("User")
            this.router.navigate(['/home']);
          }
          
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        if (this.isLoginFailed) {
          this.toastr.error('Đăng nhập thất bại!', 'Error: ');
        }
      }
    );
  }

  notification(message: string) {
    const dialogRef = this.dialog.open(NotificationRegisterComponent,
      {
        data: {
          message
        },
        width: '400px'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  login(user): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    // window.location.reload();

  }

  showPassword() {
    showPassword();
  }
}
