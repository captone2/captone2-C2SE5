import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConstants} from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'screen/list', httpOptions);
  }

  findScreenById(id: any): Observable<any> {
    return this.http.post(AppConstants.API_URL + 'screen/details', id, httpOptions);
  }

  searchScreen(keyWord: any): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'screen/search?keyWord=' + keyWord, httpOptions);
  }
}
