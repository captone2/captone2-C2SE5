import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import {SignUp} from '../shared/model/dto/SignUp';
import {JwtHelperService} from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) { }

  login(credentials): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signin', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: SignUp): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signup', user, httpOptions);
  }

  checkEmail(email: string): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'check-email', email, httpOptions);
  }

  checkPhone(phone: any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'check-phone', phone, httpOptions);
  }

  checkUsername(username: any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'check-username', username, httpOptions);

  }


  isUserLoggedIn() {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      const user = tokenPayload.sub;
      return !(user === null);
    }
    return false;
  }


  findAccountByUser() {
    const token = sessionStorage.getItem('auth-token');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    const username = tokenPayload.sub;
    return this.http.get<Account>(`${AppConstants.AUTH_API + '/findAccount'}?username=${username}`);
  }
  verify(code: string): Observable<any> {
    console.log(code);
    return this.http.post(AppConstants.AUTH_API_USER + 'verify', {
      code, httpOptions});
  }

  verifyPassword(code: string): Observable<any> {
    return this.http.post(AppConstants.AUTH_API_USER + 'verify-password', {
      code
    }, httpOptions);
  }

  resetPassword(username: string): Observable<any> {
    return this.http.post(AppConstants.AUTH_API_USER + 'reset-password', {
      username,
    }, httpOptions);
  }

  doResetPassword(password: string, code: string): Observable<any> {
    return this.http.post(AppConstants.AUTH_API_USER + 'do-reset-password', {
      password,
      code
    }, httpOptions);
  }
}

