import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../shared/model/entity/Account';


@Injectable({
  providedIn: 'root'
})
export class EmployeeAccountService {

  private readonly API_URL_EMPLOYEE_ACCOUNT_LIST = 'http://localhost:8080/api/employee-list';
  private readonly API_URL_EMPLOYEE_ACCOUNT_CREATE = 'http://localhost:8080/api/employee-account-create';
  private readonly API_URL_EMPLOYEE_ACCOUNT_UPDATE = 'http://localhost:8080/api/employee-account-edit';
  private readonly API_URL_EMPLOYEE_ACCOUNT_DELETE = 'http://localhost:8080/api/employee-account-delete';
  private readonly API_URL_EMPLOYEE_ACCOUNT_BY_ID = 'http://localhost:8080/api/employee-account';
  private readonly API_URL_EMPLOYEE_ACCOUNT_SEARCH = 'http://localhost:8080/api/';
  private readonly API_URL_EMPLOYEE_ACCOUNT_CHECK = 'http://localhost:8080/api/';

  private readonly API_URL_FOOD = 'http://localhost:8080/api/auth/food';
  private readonly API_URL_SCREEN = 'http://localhost:8080/api/screen';

  constructor(private httpClient: HttpClient) {
  }

  deleteFood(id: number): Observable<any> {
    return this.httpClient.delete(this.API_URL_FOOD + '/delete/' + id);
  }

  createFood(food: any): Observable<any> {
    return this.httpClient.post(this.API_URL_FOOD + '/create', food);
  }

  createScreen(screen: any): Observable<any> {
    return this.httpClient.post(this.API_URL_SCREEN + '/add', screen);
  }

  getEmployeeById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(this.API_URL_EMPLOYEE_ACCOUNT_BY_ID + '/' + (id));
  }


  getAllEmployee(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.API_URL_EMPLOYEE_ACCOUNT_LIST);
  }

 
  createEmployeeAccount(employee: any): Observable<any> {
    return this.httpClient.post(this.API_URL_EMPLOYEE_ACCOUNT_CREATE, employee);
  }


  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.API_URL_EMPLOYEE_ACCOUNT_DELETE + '/' + id);
  }

 
  updateEmployee(employee: any) {
    return this.httpClient.put<any>(this.API_URL_EMPLOYEE_ACCOUNT_UPDATE, employee);
  }

  searchEmployee(keyWord: string): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.API_URL_EMPLOYEE_ACCOUNT_SEARCH + '/search-employee?keyWord=' + keyWord);
  }

  checkEmail(email: string): Observable<any> {
    return this.httpClient.post(this.API_URL_EMPLOYEE_ACCOUNT_CHECK + 'check-email-employee', email);
  }

  checkPhone(phone: any): Observable<any> {
    return this.httpClient.post(this.API_URL_EMPLOYEE_ACCOUNT_CHECK + 'check-phone-employee', phone);
  }

  checkUsername(username: any): Observable<any> {
    return this.httpClient.post(this.API_URL_EMPLOYEE_ACCOUNT_CHECK + 'check-username-employee', username);
  }
  checkAccountCode(accountCode: any): Observable<any> {
    return this.httpClient.post(this.API_URL_EMPLOYEE_ACCOUNT_CHECK + 'check-accountCode-employee', accountCode);
  }

}
