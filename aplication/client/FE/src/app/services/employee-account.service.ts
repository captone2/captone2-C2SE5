import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../shared/model/entity/Account';


@Injectable({
  providedIn: 'root'
})
export class EmployeeAccountService {

  private readonly API_URL_EMPLOYEE_ACCOUNT_LIST = 'http://localhost:8080/api/employee-account-list';
  private readonly API_URL_EMPLOYEE_ACCOUNT_CREATE = 'http://localhost:8080/api/employee-account-create';
  private readonly API_URL_EMPLOYEE_ACCOUNT_UPDATE = 'http://localhost:8080/api/employee-account-edit';
  private readonly API_URL_EMPLOYEE_ACCOUNT_DELETE = 'http://localhost:8080/api/employee-account-delete';
  private readonly API_URL_EMPLOYEE_ACCOUNT_BY_ID = 'http://localhost:8080/api/employee-account';
  private readonly API_URL_EMPLOYEE_ACCOUNT_SEARCH = 'http://localhost:8080/api/';
  private readonly API_URL_EMPLOYEE_ACCOUNT_CHECK = 'http://localhost:8080/api/';



  constructor(private httpClient: HttpClient) {
  }

  // Lấy thông tin nhân viên theo id (HoangLV)
  getEmployeeById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(this.API_URL_EMPLOYEE_ACCOUNT_BY_ID + '/' + (id));
  }

  // Lấy tất cả thông tin nhân viên (HoangLV)
  getAllEmployee() {
    return this.httpClient.get(this.API_URL_EMPLOYEE_ACCOUNT_LIST);
  }

  // Thêm mới thông tin nhân viên  (HoangLV)
  createEmployeeAccount(employee: any): Observable<any> {
    return this.httpClient.post(this.API_URL_EMPLOYEE_ACCOUNT_CREATE, employee);
  }

  // Xóa thông tin nhân viên (HoangLV)
  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.API_URL_EMPLOYEE_ACCOUNT_DELETE + '/' + id);
  }

  // Sửa thông tin nhân viên theo id (HoangLV)
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
