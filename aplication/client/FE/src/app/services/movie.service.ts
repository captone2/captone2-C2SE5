import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { MovieShowtime } from '../shared/model/entity/MovieShowtime';
import { Movie } from '../shared/model/entity/Movie';
import { Food } from '../shared/model/entity/Food';
import { Genre } from '../shared/model/entity/Genre';
import { TopMovie } from '../shared/model/dto/TopMovie';
import { GenreDTO } from '../shared/model/dto/GenreDTO';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly MOVIE_URL = 'http://localhost:8080/api/auth/movie';
  private readonly MOVIE_SHOWTIME_URL = 'http://localhost:8080/api/auth/movie-showtime/';
  private readonly FOOD_URL = 'http://localhost:8080/api/auth/food/';
  private readonly SCREEN_URL = 'http://localhost:8080/api/screen/list';
  private readonly COMMENT_URL = 'http://localhost:8080/api/auth/comment';
  constructor(private httpClient: HttpClient) {
  }

  public getGenre(): Observable<GenreDTO[]> {
    return this.httpClient.get<GenreDTO[]>(this.MOVIE_URL + '/movie-genre');
  }


  public getMovieTimeByDateAndScreen(body: any): Observable<MovieShowtime[]> {
    return this.httpClient.post<MovieShowtime[]>(this.MOVIE_SHOWTIME_URL +'find-date-screen', body);
  }

  public addMovieShowTime(body: any): Observable<void> {
    return this.httpClient.post<void>(this.MOVIE_SHOWTIME_URL +'add', body);
  }


  public getAllScreen(): Observable<any> {
    return this.httpClient.get(this.SCREEN_URL);
  }

  public getAllShowTime(): Observable<any> {
    return this.httpClient.get(this.MOVIE_SHOWTIME_URL + 'show-time');
  }

  public deleteMovie(id: number): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/delete/' + id);
  }

  public getAllMovie(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.MOVIE_URL + '/getAll');
  }

  public getMovieShowing(): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/movie-coming-soon');
  }

  public getAllGenre(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(this.MOVIE_SHOWTIME_URL + 'genre');
  }

  public getMovieNow(): Observable<MovieShowtime[]> {
    return this.httpClient.get<MovieShowtime[]>(this.MOVIE_SHOWTIME_URL +'now');
  }

  public getAllMovieShowtime(): Observable<MovieShowtime[]> {
    return this.httpClient.get<MovieShowtime[]>(this.MOVIE_SHOWTIME_URL +'getAll');
  }

  public getMovieNowByGenre(id: string): Observable<MovieShowtime[]> {
    return this.httpClient.get<MovieShowtime[]>(this.MOVIE_SHOWTIME_URL +'now-genre/' + id);
  }

  public getMovieShowingByDate(date: string): Observable<MovieShowtime[]> {
    return this.httpClient.get<MovieShowtime[]>(this.MOVIE_SHOWTIME_URL +'date/' + date);
  }

  public getMovieShowingByYearAndGenre(id: string): Observable<MovieShowtime[]> {
    return this.httpClient.get<MovieShowtime[]>(this.MOVIE_SHOWTIME_URL +'year-genre/' + id );
  }
  public getMovieShowingByYear(): Observable<MovieShowtime[]> {
    return this.httpClient.get<MovieShowtime[]>(this.MOVIE_SHOWTIME_URL +'year-now');
  }

  public getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.MOVIE_URL + '/detail-movie/' + id);
  }

  public getMovieByTitle(title: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.MOVIE_URL + '/search-movie?keyword=' + title);
  }

  public getSeatSold(id: number): Observable<number[]> {
    return this.httpClient.get<number[]>('http://localhost:8080/api/auth/booking/seatSoldByShowTime/' + id);
  }

  public checkComment(account: number, movie: number): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/api/auth/booking/comment/' + account + "/" + movie);
  }

  public getAllFood(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(this.FOOD_URL + 'getAll');
  }

  public getMovieShowtimeByMovieId(id: number): Observable<any> {
    return this.httpClient.get(this.MOVIE_SHOWTIME_URL +id);
  }

  public getMovieShowtimeById(id: number): Observable<MovieShowtime> {
    return this.httpClient.get<MovieShowtime>(this.MOVIE_SHOWTIME_URL + 'detail/' +id);
  }

  public getMovieComingSoon(): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/movie-coming');
  }

  public getMovieTopFive(): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/movie-top5');
  }

  public findMovieById(id: number): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/detail-movie/' + id);
  }

  public searchMovie(keyword: string): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/search-movie?keyword=' + keyword);
  }

  public findAllMovieShowingAndComingSoon() {
    return this.httpClient.get(this.MOVIE_URL + '/all-movie');
  }

  
  public getRateByMovieId(id: number): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + "/" +id + "/rate");
  }


  public getTopMovie(): Observable<TopMovie[]> {
    return this.httpClient.get<TopMovie[]>(this.MOVIE_URL + '/movie-rate');
  }
}
