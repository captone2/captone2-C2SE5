import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authe.service';

@Component({
  selector: 'app-check-register',
  templateUrl: './check-register.component.html',
  styleUrls: ['./check-register.component.css']
})
export class CheckRegisterComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params.code;
      this.authService.verifyPassword(code).subscribe(
        data => {
          this.authService.verifyRegister(code).subscribe(data => {
            this.toastr.success('Xác thực thành công!', 'Success: ');
            this.router.navigateByUrl('/login');
          },err => {
            this.toastr.error('Xác thực không thành công!', 'Error: ');
            this.router.navigateByUrl('/login');
          })
        },
        err => {
          this.toastr.error('Mã xác thực không đúng!', 'Error: ');
          this.router.navigateByUrl('/login');
        }
      );

    });
  }

}
