import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './authe.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private isLoggedIn: boolean;
  private currentUser: any;

  constructor(private router: Router,
    private authService: AuthService, private jwtHelper: JwtHelperService,
    private tokenStorageService: TokenStorageService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.isLoggedIn = !!this.tokenStorageService.getToken();


    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getUser();
    }

    if (!this.authService.isUserLoggedIn()) {
      sessionStorage.setItem('requestedPage', state.url);
      this.router.navigateByUrl('/login')
      return false;
    }

    const expectedRoles = route.data.expectedRole;
    const userRoles = this.currentUser.roles;
    for (const role of userRoles) {
      if (expectedRoles.indexOf(role) == -1) {
        window.sessionStorage.clear();
        console.log('Khong Du Quyen');
        this.router.navigateByUrl('/home');
        return false
      }
    }

    // for (let i = 0 ; i < this.currentUser.roles.length; i++ ){
    //   console.log(this.currentUser.roles)
    //   console.log(route.data.expectedRole)
    //   console.log(route.data.expectedRole.indexOf(this.currentUser.roles.pop()))
    //   if (route.data.expectedRole.indexOf(this.currentUser.roles.pop()) == -1){
    //     window.sessionStorage.clear();
    //     console.log('Khong Du Quyen');
    //     this.router.navigateByUrl('/home');
    //     return false
    //   }
    // }
    return true;
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   this.isLoggedIn = !!this.tokenStorageService.getToken();

  //   if (this.isLoggedIn) {
  //     this.currentUser = this.tokenStorageService.getUser();
  //   }

  //   const expectedRole = route.data.expectedRole;

  //   const token = sessionStorage.getItem('auth-token');

  //   const tokenPayload = this.jwtHelper.decodeToken(token);

  //   console.log(this.authService.isUserLoggedIn());
  //   if (!this.authService.isUserLoggedIn()) {
  //     console.log('chua login');
  //     this.router.navigateByUrl('/login');
  //   }
  //   for (let i = 0 ; i < this.currentUser.roles.length; i++ ){
  //     if (route.data.expectedRole.indexOf(this.currentUser.roles.pop()) == -1){
  //       console.log('ko du quyen');
  //       return false;
  //     }
  //   }
  //   return true;
  // }
}
