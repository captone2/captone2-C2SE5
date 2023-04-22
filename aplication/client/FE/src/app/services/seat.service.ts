import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {SeatDTO} from '../shared/model/dto/SeatDTO';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private readonly SEAT_URL = 'http://localhost:8080/api/seat';


  constructor(private httpClient: HttpClient) {
  }

  public getSeatByMovieShowtimeId(movieShowId : number) {
    return this.httpClient.get(this.SEAT_URL + '/get-seat/' + movieShowId);
  }


}
