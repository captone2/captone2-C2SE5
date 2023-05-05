import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookingDTO} from '../shared/model/dto/BookingDTO';
import { Observable } from 'rxjs';
import { Booking } from '../shared/model/entity/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly BOOKING_URL = 'http://localhost:8080/api/auth/booking';

  constructor(private httpClient: HttpClient) {
  }

  public getSeatBySeatNameAndShowtimeAndMovie(movieId: number, showtimeId: number, transactionId: string) {
    return this.httpClient.get(this.BOOKING_URL + '/booking/' + movieId + '/' + showtimeId + '/' + transactionId);
  }


  public getListBookingByAccountId(accountId : number): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.BOOKING_URL + '/account/' + accountId);
  }
  
}
