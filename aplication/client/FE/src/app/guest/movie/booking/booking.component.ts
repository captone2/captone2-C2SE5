import { SeatService } from './../../../services/seat.service';
import { AccountUserServiceService } from './../../../services/account-user-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';
import { CookieService } from 'ngx-cookie-service';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookingDTO } from 'src/app/shared/model/dto/BookingDTO';
import * as jQuery from 'jquery';
import { Food } from '../../../shared/model/entity/Food';
import { Account } from 'src/app/shared/model/entity/Account';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { log } from 'console';
import { BookingPost } from 'src/app/shared/model/dto/BookingPost';
import { AngularFireStorage } from '@angular/fire/storage';
import QRCode from 'qrcode';
import { Thickness } from '@syncfusion/ej2-angular-charts';
declare var jQuery: any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  @ViewChild('openBtn') openBtn: ElementRef;
  @ViewChild('qrCanvas') qrCanvas;
  urlQrCode: string;
  account: Account;
  count = 0;
  booking: any;
  seatContext: string;
  foodList: Food[] = [];
  transactionId: string;
  movieShowtimeId: number;
  seat: any = [];
  showSeat: any = [];
  bookingDTO: BookingDTO = null;
  foodShow: Food[] = [];
  movieShowtime: MovieShowtime
  checkStatusBook: boolean = false;
  bookingQRCode: any;
  seatListSold: number[] = [];
  @ViewChild('modalMaxchair') modalMaxchair: ElementRef;
  private readonly destroy$ = new Subject<void>();
  constructor(private storage: AngularFireStorage, private elRef: ElementRef, private router: Router, private accountService: AccountUserServiceService, private cookieService: CookieService, private movieService: MovieService, private http: HttpClient, private activatedRoute: ActivatedRoute, private seatService: SeatService) { }

  ngOnInit(): void {
    this.getSeatSold();
    this.checkBookingExist();
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.clearExpiredCookies();
      });
    this.getAllSeatByScreen();
     this.getMovieShowTimeById();
    this.getCookieValueByName();
    this.getAllFood();
    this.getUserById();
    this.checkNext();
    this.getShowSeatName();
  }

closeModal() {
  this.modalMaxchair.nativeElement.style.animation = 'topdown 0.5s ease-in-out forwards';
  this.modalMaxchair.nativeElement.style.display = 'none';
  document.querySelector('.overlay').classList.remove('show');
}

  getAllSeatByScreen() {
    this.movieShowtimeId = parseInt(this.activatedRoute.snapshot.params['movieShowTimeId'])
    this.seatService.getSeatByMovieShowtimeId(this.movieShowtimeId).subscribe(data => {
      this.seat = data

      while (this.seat.length > 0) {
        let batch = this.seat.splice(0, 16);
        this.showSeat.push(batch);
      }
    }, error => {
      console.log(error)
    })
  }

  getMovieShowTimeById() {
    this.movieShowtimeId = parseInt(this.activatedRoute.snapshot.params['movieShowTimeId'])
    this.movieService.getMovieShowtimeById(this.movieShowtimeId).subscribe(data => {
      this.movieShowtime = data
    }, error => {
      console.log(error)
    })
  }

  getSeatSold() {
    console.log("Sold")
    this.movieShowtimeId = parseInt(this.activatedRoute.snapshot.params['movieShowTimeId'])
    this.movieService.getSeatSold(this.movieShowtimeId).subscribe(data => {
      this.seatListSold = data;
      console.log(this.seatListSold)
    }, error => {
      console.log(error)
    })
  }

  getCookieValueByName() {
    const bookingJSON = this.cookieService.get(this.activatedRoute.snapshot.params['transactionId']);
    this.bookingDTO = JSON.parse(bookingJSON) as BookingDTO;
    console.log(this.bookingDTO)
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

  addSeat(target: any, idSeat: number, nameSeat: string) {
    console.log(this.bookingDTO)
    if  (this.bookingDTO.seatId.length == 5) {
      this.modalMaxchair.nativeElement.style.animation = 'downtop 0.5s ease-in-out forwards';
      this.modalMaxchair.nativeElement.style.display = 'block';
      document.querySelector('.overlay').classList.add('show');
    } else {
      const indexId = this.bookingDTO.seatId.indexOf(idSeat);
      if (indexId !== -1) {
        this.bookingDTO.seatId.splice(indexId, 1);
        target.classList.remove('active-seat');
        this.bookingDTO.totalPrice -= 50000;
      } else {
        this.bookingDTO.seatId.push(idSeat);
        target.classList.add('active-seat');
        this.bookingDTO.totalPrice += 50000;
      }
      const indexName = this.bookingDTO.seatName.indexOf(nameSeat);
      if (indexName !== -1) {
        this.bookingDTO.seatName.splice(indexName, 1);
      } else {
        this.bookingDTO.seatName.push(nameSeat)
      }
      this.getShowSeatName()
      this.checkNext();
    }


   
  }

  getShowSeatName() {
    this.seatContext = this.bookingDTO.seatName.join(', ');
    return this.seatContext
  }

  getDuration(startDay: string): string {
    const bookingJSON = this.cookieService.get(this.activatedRoute.snapshot.params['transactionId']);
    if ( this.checkStatusBook == false) {
      if (bookingJSON == '') {
        this.showRebuyModal();
        window.top.close();
        return '00:00'
      } else {
        const end = new Date(startDay);
        const now = new Date();
        const diff = Math.round((end.getTime() - now.getTime()) / 1000); // tính khoảng thời gian cách biệt
        const minutes = Math.floor(Math.abs(diff) / 60);
        const seconds = Math.abs(diff) % 60;
        const formattedTime = `${diff < 0 ? '-' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedTime;
      }
    }
  }
  openModal(): void {
    // console.log("close")
    this.openBtn.nativeElement.click();
  }

  updateValueCookie() {
    const name = this.activatedRoute.snapshot.params['transactionId']
    const originalString = this.bookingDTO.dayTimeCookie;
    const date = new Date(originalString);
    const expires = date.toUTCString();
    document.cookie = `${name}=${JSON.stringify(this.bookingDTO)}; expires=${expires}; path=/`;
    this.getCookieValueByName();
    this.count++;
    if (this.count === 1) {
      jQuery('.steps').removeClass('active-step');
      jQuery('.water-corn').addClass('active-step');
      jQuery('.booking-chair').css('display', 'none');
      jQuery('.book-food').css('display', 'block');
    } else if (this.count === 2) {

      for (let i = 0; i < this.bookingDTO.foodId.length; i++) {
        const food = {
          id: this.bookingDTO.foodId[i],
          title: this.bookingDTO.foodName[i],
          quantity: this.bookingDTO.foodTotal[i],
          price: this.bookingDTO.foodPrice[i],
          description: '',
        };

        this.foodShow.push(food);
        this.initConfig();
      }

      jQuery('.steps').removeClass('active-step');
      jQuery('.payment-st').addClass('active-step');
      jQuery('.step-payment').css('display', 'block');
      jQuery('.booking-chair').css('display', 'none');
      jQuery('.book-food').css('display', 'none');
      jQuery('.info').css('display', 'none');
      jQuery('.total').css('margin-top', '0px');
      jQuery('.btn-next').css('display', 'none');
      jQuery('.btn-pay').css('display', 'block');
      jQuery('.description').css('display', 'block');
    }
  }

  getAllFood() {

    this.movieService.getAllFood().subscribe(data => {
      this.foodList = data
    })
  }

  getUserById() {
    const user = JSON.parse(sessionStorage.getItem('auth-user'))
    const id = user.id;
    this.accountService.findAccountId(id).subscribe(data => {
      this.account = data
    })
  }

  plusFood(id: number, price: number) {
    const foodIdIndex = this.bookingDTO.foodId.indexOf(id)
    let value = this.bookingDTO.foodTotal[foodIdIndex]
    if (value != 10) {
      value = value + 1;
      this.bookingDTO.totalPrice = this.bookingDTO.totalPrice + price
      this.bookingDTO.foodTotal[foodIdIndex] = value
    }
  }

  minusFood(id: number, price: number) {
    const foodIdIndex = this.bookingDTO.foodId.indexOf(id)
    let value = this.bookingDTO.foodTotal[foodIdIndex]
    if (value != 0) {
      value = value - 1;
      this.bookingDTO.totalPrice = this.bookingDTO.totalPrice - price
      this.bookingDTO.foodTotal[foodIdIndex] = value
    }
  }

  getValue(id: number) {
    const foodIdIndex = this.bookingDTO.foodId.indexOf(id)
    const value = this.bookingDTO.foodTotal[foodIdIndex]
    return value
  }

  showInfoBooking() {
    const myValue = (this.bookingDTO.totalPrice / 23000).toFixed(2);
    console.log(myValue)

    this.elRef.nativeElement.querySelector('.modal-payment').style.animation = 'topdown 0.5s ease-in-out forwards';
    this.elRef.nativeElement.querySelector('.overlay').style.display = 'none';
    this.elRef.nativeElement.querySelector('.modal-payment').style.animation = 'downtop 0.5s ease-in-out forwards';
    this.elRef.nativeElement.querySelector('.modal-payment').style.display = 'block';
    this.elRef.nativeElement.querySelector('.overlay').style.display = 'block';
  }

  handleOverlayClick() {
    this.elRef.nativeElement.querySelector('.modal-payment').style.animation = 'topdown 0.5s ease-in-out forwards';
    this.elRef.nativeElement.querySelector('.overlay').style.display = 'none';
  }


  initConfig(): void {
    const myvalue = (this.bookingDTO?.totalPrice / 23000).toFixed(2);
    console.log(myvalue)
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: myvalue,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: myvalue
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: myvalue,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'checkout',
        layout: 'horizontal',
        size: 'small',
        shape: 'rect'
      },
      onApprove: (data, actions) => {
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          this.checkStatusBook == true;
          this.bookingQRCode = this.generateRandomString(64)
          this.generateQRCode(this.bookingQRCode)
          this.showBookingSusses();
         
        });
      },
      onClientAuthorization: (data) => {
        // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
        alert('Cancel');
      },
      onError: err => {
        // console.log('OnError', err);
        alert('error');
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);
      },
    };
  }

  checkActive(id: number) {
    return this.bookingDTO.seatId.includes(id)
  }
  checkNext() {
    console.log(this.bookingDTO.seatId.length)
    if (this.bookingDTO.seatId.length == 0) {
      jQuery(".btn-next").css({ "pointer-events": "none", "opacity": "0.6" });
    } else {
      jQuery(".btn-next").css({ "pointer-events": "auto", "opacity": "1.0" });
    }
  }

  checkBookingExist() {
    if (this.cookieService.check(this.activatedRoute.snapshot.params['transactionId']) == false) {
      this.router.navigateByUrl('/booking-not-exist')
    }
  }
  showRebuyModal() {
    this.elRef.nativeElement.querySelector('.modal-rebuy').style.animation = 'downtop 0.5s ease-in-out forwards';
    this.elRef.nativeElement.querySelector('.modal-rebuy').style.display = 'block';
    this.elRef.nativeElement.querySelector('.overlay').style.display = 'block';
  }


  showBookingSusses() {
    this.elRef.nativeElement.querySelector('.qr-success').style.display = 'block';
    this.elRef.nativeElement.querySelector('.booking-main').style.display = 'none';
    this.elRef.nativeElement.querySelector('.modal-payment').style.animation = 'topdown 0.5s ease-in-out forwards';
    this.elRef.nativeElement.querySelector('.overlay').style.display = 'none';
  }

  postListSeatNumbersAndId(numbers: number[], bookingCode: string): Observable<any> {
    const url = `http://localhost:8080/api/auth/booking/seat`;
    const body = {
      numbers: numbers,
      id: bookingCode
    };
    return this.http.post(url, body);
  }

  postTwoListsFood(bookingCode: string, list1: number[], list2: number[]): Observable<any> {
    const body = {
      id: bookingCode,
      list1: list1, //total
      list2: list2  //foodid
    };
    return this.http.post('http://localhost:8080/api/auth/booking/food', body);
  }

  createBooking(booking: BookingPost): Observable<any> {
    const url = `http://localhost:8080/api/auth/booking`;
    return this.http.post(url, booking);
  }

  priceBooking() {
    return ""
  }

  generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  async createQRCode(hashCode: string) {
    const canvas = this.qrCanvas.nativeElement;
    const code = await QRCode.toCanvas(canvas, hashCode, {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 10,
      color: {
        dark: '#000',
        light: '#fff',
      },
    });

    const dataUrl = canvas.toDataURL();

    // Create a unique file name
    const fileName = `qr_code_${new Date().getTime()}.png`;

    // Upload the file to Firebase Storage
    const fileRef = this.storage.ref(fileName);
    const uploadTask = fileRef.putString(dataUrl, 'data_url');
    uploadTask.snapshotChanges().subscribe(() => {
      // Get the URL of the uploaded file
      fileRef.getDownloadURL().subscribe((url) => {
        this.urlQrCode = url;
        const myBooking = new BookingPost();
        myBooking.bookingCode = hashCode;
        myBooking.dayTimeBooking = this.bookingDTO.dayTimeCookie;
        myBooking.totalPrice = this.bookingDTO.totalPrice;
        myBooking.accountId = this.bookingDTO.accountId;
        myBooking.movieShowTimeId = this.bookingDTO.movieShowTimeId;
        console.log(this.urlQrCode)
        myBooking.urlQrCode = this.urlQrCode;
        this.createBooking(myBooking).subscribe((data) => {
          this.postListSeatNumbersAndId(this.bookingDTO.seatId, this.bookingQRCode).subscribe((data) => {
          });;
          this.postTwoListsFood(this.bookingQRCode, this.bookingDTO.foodTotal, this.bookingDTO.foodId).subscribe((data) => {
          });
        });
      });
    });
  }

  generateQRCode(hashCode: string) {
    this.createQRCode(hashCode);
  }

  checkSold(id: number) {
    return this.seatListSold.includes(id);
  }
}
