import { DateDTO } from './../../../shared/model/dto/DateDTO';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { AuthService } from '../../../services/authe.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../shared/model/entity/Movie';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';
import { BookingDTO } from 'src/app/shared/model/dto/BookingDTO';
import { Transaction } from 'src/app/shared/model/dto/Transaction';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Food } from '../../../shared/model/entity/Food';
import { Genre } from 'src/app/shared/model/entity/Genre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  id: number;
  movie: Movie;
  movieDetail: Movie;
  movieShowtime1: MovieShowtime;
  movieShowtime: MovieShowtime[] = [];
  dateDTO: DateDTO[] = [];
  cookieList: string[] = [];
  foodList: Food[] = [];
  url = 'assets/js/main.js';
  loadAPI: any;
  rate: number = 0;
  comnentForm: FormGroup;
  private baseUrl = 'http://localhost:4200api/auth/booking';
  private readonly destroy$ = new Subject<void>();
  constructor(private form: FormBuilder, private authService: AuthService, private router: Router, private http: HttpClient, private movieService: MovieService, private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
    this.getAllFood()
    this.getMovie();
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.clearExpiredCookies();
      });
      this.getMovieDetail();

      this.comnentForm = this.form.group({
        content: ['', [Validators.required,
        Validators.minLength(3), Validators.maxLength(50)]],

      });
  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  
  getMovieDetail() {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.movieService.findMovieById(this.id).subscribe(data => {
      this.movieDetail = data ;
      console.log(data)
    })
  }

  getMovie() {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.movieService.getMovieShowtimeByMovieId(this.id).subscribe(data => {
      const dateList: DateDTO[] = data.reduce((acc: DateDTO[], obj: any) => {
        const existingDateDTO = acc.find((d: DateDTO) => d.day === obj.showDate);
        if (existingDateDTO) {
          existingDateDTO.showtime.push({ id: obj.id, time: obj.showtime.showTime });
        } else {
          acc.push({ day: obj.showDate, showtime: [{ id: obj.id, time: obj.showtime.showTime }] });
        }
        return acc;
      }, []);
      this.dateDTO = dateList;
      this.dateDTO.sort((a, b) => {
        // Compare by day
        if (a.day < b.day) {
          return -1;
        } else if (a.day > b.day) {
          return 1;
        } else {
          // If day is the same, compare by time
          const aTime = a.showtime[0].time;
          const bTime = b.showtime[0].time;
          if (aTime < bTime) {
            return -1;
          } else if (aTime > bTime) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      for (let i = 0; i < this.dateDTO.length; i++) {
        this.dateDTO[i].showtime.sort((a, b) => {
          if (a.time < b.time) {
            return -1;
          } else if (a.time > b.time) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }, (error) => {
    });
  }

  redirectBooking(showtimeId: number) {
    if (!this.authService.isUserLoggedIn()) {
      sessionStorage.setItem('requestedPage', '/movie-detail/' + this.id);
      const requestedPage = sessionStorage.getItem('requestedPage');
      this.router.navigateByUrl('/login');
    } else {
     
      const isExist = this.checkCookie('cookieList');
      if (isExist) {
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('cookieList='))
          .split('=')[1];
        this.cookieList = JSON.parse(cookieValue);
      }
      if (this.cookieList.length == 3) {
        
        this.router.navigateByUrl('/transaction');
      } else {
        this.movieService.getMovieShowtimeById(showtimeId).subscribe(data => {
          this.movieShowtime1 = data
          if (this.movieShowtime1) {
            const currentDate = new Date();
            let day: any = currentDate.getDate();
            let month: any = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes() + 5;
            let seconds = currentDate.getSeconds();
            // Xử lý quá giờ nếu cần
            if (minutes >= 60) {
              hours += 1;
              minutes -= 60;
            }
            if (month < 10) {
              month = `0${month.toString()}` as string;
            }
            if (day < 10) {
              day = `0${day.toString()}`;
            }
            const user = JSON.parse(sessionStorage.getItem('auth-user'))
            const transactionName = this.generateRandomString(30);
            const transaction = new Transaction();
            transaction.name = transactionName;
            const booking = new BookingDTO();
            booking.dayTimeCookie = `${year}-${month}-${day} ${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
            booking.totalPrice = 0;
            booking.received = true;
            booking.accountId = user.id;
            booking.movieShowTimeId = showtimeId;
            booking.movieName = this.movieShowtime1.movie.title;
            booking.showtime = this.movieShowtime1.showtime.showTime;
            booking.showDate = this.movieShowtime1.showDate;
            booking.transactionName = transactionName;
            booking.seatName = [];
            booking.seatId = [];
            booking.foodId = [];
            booking.foodTotal = [];
            booking.foodName = [];
            booking.foodPrice = [];
            for (let i = 0; i < this.foodList.length; i++) {
              let currentFood = this.foodList[i];
              let currentFoodId = currentFood.id;
              
              booking.foodId.push(currentFoodId);
              booking.foodTotal.push(0);
              booking.foodName.push(this.foodList[i].title)
              booking.foodPrice.push(this.foodList[i].price)
            }
            transaction.value = booking;
            const cookieValue = JSON.stringify(transaction.value);
            const now = new Date();
            const fiveMinutes = 5 * 60 * 1000; 
            const expires = new Date(now.getTime() + fiveMinutes).toUTCString();
            document.cookie = `${transaction.name}=${cookieValue}; expires=${expires}; path=/`;
            this.cookieList.push(transactionName)
            document.cookie = `cookieList=${JSON.stringify(this.cookieList)}; max-age=300000000000; path=/`;
            this.router.navigateByUrl('/booking/' + showtimeId + '/' + transactionName);
          }
        }, error => {
          console.log(error)
        })
      }
    }
  }

  generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  checkCookie(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return true;
      }
    }
    return false;
  }

  getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  checkCookieExpiration(cookieName: string): boolean {
    const cookie = this.getCookie(cookieName);
    if (!cookie) {
      return true;
    }
    const cookieObj = typeof cookie === 'string' ? JSON.parse(cookie) : cookie;
    const expiration = new Date(cookieObj.expires);
    const now = new Date();
    return now > expiration;
  }

  setCookie(name: string, value: string, expiration: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (expiration * 1000));
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  clearExpiredCookies(): void {
    const cookieList = this.getCookie("cookieList");
    if (cookieList) {
      const cookies = JSON.parse(cookieList);
      const validCookies = cookies.filter(cookie => !this.checkCookieExpiration(cookie));
      if (validCookies.length !== cookies.length) {
        const updatedList = JSON.stringify(validCookies);
        console.log(updatedList)
        document.cookie = `cookieList=${updatedList}; max-age=300000000000; path=/`;
      }
    }
  }

  getAllFood() {
    this.movieService.getAllFood().subscribe(data => {
      this.foodList = data
    })
  }

  convertTime(id: number) {
    const minutes: number = id;
    const date: Date = new Date(0, 0, 0, 0, minutes);
    const hours: number = date.getHours();
    const formattedMinutes: string = ('0' + date.getMinutes()).slice(-2);
    const formattedTime: string = ('0' + hours).slice(-2) + ' hours ' + formattedMinutes + ' minutes';
    return formattedTime
  }

  convertGenre(arr: Genre[]) {
    return arr.map(genre => genre.name).join(', ');
  }

  handleStarClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dataValue = target.getAttribute('data-value');
    if (dataValue) {
      const value = parseInt(dataValue, 10);
      this.rate = value
      console.log(value);
    }
  }



}
