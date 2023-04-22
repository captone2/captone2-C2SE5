import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../shared/model/entity/Account';
import {AccountMemberDTO} from '../shared/model/dto/AccountMemberDTO';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ManagerUserService {

  private readonly API_MEMBER = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient) {
  }
  // Hiển thị danh sách thành viên-PhapNT
  getAllMember(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.API_MEMBER + '/list-member');
  }
  // Thêm mới thành viên_PhapNT
  createNewMember(account: AccountMemberDTO): Observable<void>{
    return this.httpClient.post<void>(this.API_MEMBER + '/create-member', account );
  }
// Hiển thị chi tiết thành viên- PhapNT
  findByIdMember(id: number): Observable<Account>{
    return this.httpClient.get<Account>(this.API_MEMBER + '/public/findById-member/' + id);
  }
  // Chỉnh sửa thành viên-PhapNT
  updateMember(account: AccountMemberDTO): Observable<void>{
    return this.httpClient.put<void>(this.API_MEMBER + '/update-member/' + account.id, account);
  }
  // Xóa thành viên- PhapNT
  deleteMember(id: number){
    return this.httpClient.delete(this.API_MEMBER + '/delete-member/' + id);
  }
  // Tìm kiếm thành viên-PhapNT
  searchByNameMember(nameSearch: string): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.API_MEMBER + '/searchName-member?name=' + nameSearch);
  }
  checkEmail(email: string): Observable<any> {
    return this.httpClient.post(this.API_MEMBER + 'check-emailMember', email,httpOptions);
  }
  checkPhone(phone: string): Observable<any> {
    return this.httpClient.post(this.API_MEMBER + 'check-phoneMember', phone);
  }
  checkUsername(username: string): Observable<any> {
    return this.httpClient.post(this.API_MEMBER + 'check-usernameMember', username);
  }

}
