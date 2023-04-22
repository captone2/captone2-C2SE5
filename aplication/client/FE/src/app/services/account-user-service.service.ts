import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../shared/model/entity/Account';


@Injectable({
  providedIn: 'root'
})
export class AccountUserServiceService {
  private baseURL = 'http://localhost:8080/api';

  httpOptions: any;

  constructor(private  httpClient: HttpClient) {
    {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      };
    }
  }

  findAccountUserId(id: number): Observable<Account> {

    return this.httpClient.get<Account>(this.baseURL + '/accountFindById/' + id);
  }


  findAccountId(id: number): Observable<Account> {

    return this.httpClient.get<Account>(this.baseURL + '/account/' + id);
  }

  updateAccountUser(account: Account): Observable<Account> {
    return this.httpClient.put<Account>(this.baseURL + '/public/update/' + account.id, account);

  }
//   findBooking( ): Observable<ManagerBooking[]> {

//     return this.httpClient.get<ManagerBooking[]>(this.baseURL + '/account/booking');
//   }
//  findAllByIdBooking(idAccount: any): Observable<ManagerBooking[]> {
//     return this.httpClient.get<ManagerBooking[]>(this.baseURL + '/account/booking/' + idAccount);
//   }
  changePassword(account: Account): Observable<Account> {
    return this.httpClient.put<Account>(this.baseURL + '/public/changePassword/' + account.id, account);

  }
}
