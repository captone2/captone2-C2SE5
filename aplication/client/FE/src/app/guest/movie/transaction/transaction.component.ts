import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { CookieService } from 'ngx-cookie-service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { get } from 'http';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  cookies: any[] = [] ;
  expires: string;
  cookieExpiration: string;
  expiresValue: any;
  movieName: string;
  private readonly destroy$ = new Subject<void>();
  constructor(private cookieService: CookieService, private movieService: MovieService, private router: Router) {

  }

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.clearExpiredCookies();
        this.getAllCookie()
      });
  }


  getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe(data => {
      this.movieName = data.title
    })
    return this.movieName
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
        document.cookie = `cookieList=${updatedList}; max-age=300000000000; path=/`;
      }
    }
  }

  getDuration(startDay: string): string {
    const end = new Date(startDay);
    const now = new Date();
    const diff = Math.round((end.getTime() - now.getTime()) / 1000); // tính khoảng thời gian cách biệt
    const minutes = Math.floor(Math.abs(diff) / 60);
    const seconds = Math.abs(diff) % 60;
    const formattedTime = `${diff < 0 ? '-' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; 
    return formattedTime;
  }

  getAllCookie() {
    this.cookies = [];
    let cookieList = JSON.parse(this.cookieService.get('cookieList'));
    cookieList.forEach(cookieName => {
      let value = this.cookieService.get(cookieName);
      if (value) {
        this.cookies.push(JSON.parse(value));
      }
    });
  }
  
  clearCookie(cookieName: string) {
    console.log(cookieName)
    this.cookieService.delete(cookieName);
  }

  redirectBooking(cookieName: string, movieShowTimeId: number) {
    this.router.navigateByUrl('/booking/' + movieShowTimeId + '/' + cookieName);
  }
}





