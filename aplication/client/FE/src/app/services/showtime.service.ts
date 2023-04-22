import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  private readonly SHOWTIME_URL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {
  }

// TuHC - lay danh sach suat chieu theo phim
  public getShowtimeByMovieId(id: number) {
    return this.httpClient.get(this.SHOWTIME_URL + '/get-showtime/' + id);
  }
}
