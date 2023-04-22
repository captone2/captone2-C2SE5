import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookingDTO} from '../shared/model/dto/BookingDTO';

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

  
}
