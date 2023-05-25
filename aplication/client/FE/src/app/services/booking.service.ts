import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookingDTO} from '../shared/model/dto/BookingDTO';
import { Observable } from 'rxjs';
import { Booking } from '../shared/model/entity/Booking';
import { TicketFoodDTO } from '../shared/model/dto/TicketFoodDTO';

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

  
  public getLastYear(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.BOOKING_URL + '/revenue-last');
  }

  public getAccountMonth(): Observable<number> {
    return this.httpClient.get<number>(this.BOOKING_URL + '/account-month');
  }

  public getNowYear(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.BOOKING_URL + '/revenue-now');
  }

  public getTicketFood(): Observable<TicketFoodDTO> {
    return this.httpClient.get<TicketFoodDTO>(this.BOOKING_URL + '/ticket-food');
  }
}
