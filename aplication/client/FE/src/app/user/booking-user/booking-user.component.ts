import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../shared/model/entity/Movie';
import {JsogService} from 'jsog-typescript';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ShowtimeService} from '../../services/showtime.service';
import {Showtime} from '../../shared/model/entity/Showtime';
import {SeatService} from '../../services/seat.service';
import {Seat} from '../../shared/model/entity/Seat';
import {TokenStorageService} from '../../services/token-storage.service';
import {SeatDTO} from '../../shared/model/dto/SeatDTO';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

const MAX_SEATS = 8;

@Component({
  selector: 'app-booking-user',
  templateUrl: './booking-user.component.html',
  styleUrls: ['./booking-user.component.css']
})
export class BookingUserComponent implements OnInit, OnDestroy {
  movies: any[];
  showtimes: any[] = [];
  movieId: number;
  showtimeId: number;
  maxDate: Date;
  minDate: Date;
  selectedMovie: any;
  selectedTasks = {};
  isLoggedIn = false;
  public rows: Array<string>;
  public seats: Array<number>;
  seatChoose = [];
  seatBooking: any[] = [];
  seat: SeatDTO;
  selectedIdx = '';
  subscription: Subscription;

  constructor(private movieService: MovieService, private jsogService: JsogService,
              private formBuilder: FormBuilder, private showtimeService: ShowtimeService,
              private seatService: SeatService,
              private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();  // id
    }

    this.movieService.findAllMovieShowingAndComingSoon().subscribe(data => {
      // @ts-ignore
      this.movies = this.jsogService.deserializeArray(data, Movie);
    });
    // this.rows = ['A', 'B', 'C', 'D', 'E'];
    // this.seats = [1, 2, 3, 4, 5, 6, 7, 8];
    // this.subscription = this.seatService.sharedParam.subscribe(data => {
    //   this.seatBooking = data;
    // });
  }


  // TuHC - chon phim
  onChangeMovie(newMovie) {
    this.movieId = newMovie;
    this.movieService.findMovieById(this.movieId).subscribe(data => {
      // @ts-ignore
      this.selectedMovie = this.jsogService.deserializeObject(data, Movie);
      this.minDate = this.selectedMovie.showingFrom;
      this.maxDate = this.selectedMovie.showingTo;
    });
    this.showtimeService.getShowtimeByMovieId(this.movieId).subscribe(data => {
      // @ts-ignore
      this.showtimes = this.jsogService.deserializeArray(data, Showtime);
    });
  }

  // TuHC - chon ghe
  chooseSeat(seat: string) {
    this.selectedIdx = seat;
    const index: number = this.seatChoose.indexOf(seat);
    if (index !== -1) {
      this.seatChoose.splice(index, 1);
      return;
    }
    this.seatChoose.push(seat);
  }

  // TuHC - dat ve
  // booking() {
  //   for (const seat of this.seatChoose) {
  //     this.seatService.getSeatBySeatNameAndShowtimeAndMovie(seat, this.showtimeId, this.movieId).subscribe(data => {
  //       // @ts-ignore
  //       this.seat = this.jsogService.deserialize(data, SeatDTO);
  //       this.seatBooking.push(this.seat);
  //     });
  //   }
  //   this.seatService.changeParam(this.seatBooking);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
