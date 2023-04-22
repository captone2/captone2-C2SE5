// @ts-ignore
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Price} from '../shared/model/entity/Price';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class ListPriceService {
  private readonly API_URL_PRICE_LIST = 'http://localhost:8080/api/auth/prices';
  constructor(private httpClient: HttpClient) {
  }
  getPrice(): Observable<Price>{
    return this.httpClient.get<Price>(this.API_URL_PRICE_LIST);
  }
}
