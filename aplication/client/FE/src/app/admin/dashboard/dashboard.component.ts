import { MovieService } from 'src/app/services/movie.service';
import { TicketFoodDTO } from './../../shared/model/dto/TicketFoodDTO';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BookingService } from 'src/app/services/booking.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DatePipe } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { GenreDTO } from 'src/app/shared/model/dto/GenreDTO';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lastYear: number[] = [];
  nowYear: number[] = [];
  listName: string[] = [];
  listTotal: number[] = [];
  listGenre: GenreDTO[] = [];
  ticketFood: TicketFoodDTO;
  sumLast: number = 0;
  sumNow: number = 0;
  account: number = 0;
  constructor(
    private elementRef: ElementRef,
    private bookingService: BookingService,
    private movieService: MovieService,
  ) { }

  @ViewChild('myChart') myChart!: ElementRef;
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  ngOnInit(): void {
    this.loadData();
    this.getAccount();
  }


  getAccount() {
    this.bookingService.getAccountMonth().subscribe(data => {
      this.account = data;
    })
  }
  loadData(): void {
    this.getLastYearAndNowYear().subscribe(([lastYearData, nowYearData]) => {
      this.lastYear = lastYearData;
      this.nowYear = nowYearData;
      this.getTicketFood();

    });
  }
  


  getLastYearAndNowYear(): Observable<[number[], number[]]> {
    const lastYearData$ = this.bookingService.getLastYear();
    const nowYearData$ = this.bookingService.getNowYear();
    const ticketFoodData$ = this.bookingService.getTicketFood();
    return forkJoin([lastYearData$, nowYearData$]);
  }

  getTicketFood() {
    this.bookingService.getTicketFood().subscribe(data => {
      this.ticketFood = data;
      this.ticketFood.ticket = Math.round(this.ticketFood.ticket / 23000);
      this.ticketFood.food = Math.round(this.ticketFood.food / 23000);
      console.log(data)
      this.movieService.getGenre().subscribe(data => {
        this.listGenre = data;
        console.log(this.listGenre)
        for (const item of this.listGenre) {
          this.listName.push(item.name);
          this.listTotal.push(item.total);
        };
        this.drawCharts();
      })
      
    })
  }


  drawCharts(): void {
    console.log("Vẻ")
    // const canvas = this.elementRef.nativeElement.querySelector('#myChart');
    // const ctx = canvas.getContext('2d');
    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May'],
    //     datasets: [
    //       {
    //         label: 'Sample Dataset',
    //         data: [12, 19, 3, 5, 2, 3, 10],
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         borderColor: 'rgba(75, 192, 192, 1)',
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       text: 'Title',
    //     },
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
   
    
    const canvas3 = this.elementRef.nativeElement.querySelector('#myChart');
    const ctx3 = canvas3.getContext('2d');
    const data3 = {
      labels: this.listName,
      datasets: [{
        label: 'Genre',
        data: this.listTotal,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235)',
        pointBackgroundColor: 'rgba(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235)',
      }]
    };

    new Chart(ctx3, {
      type: 'radar',
      data: data3,

    });





    this.lastYear = this.lastYear.map(value => (value / 23000));
    this.nowYear = this.nowYear.map(value => value / 23000);
    this.sumLast= this.lastYear.reduce((a, b) => a + b, 0);
    this.sumNow= this.nowYear.reduce((a, b) => a + b, 0);
    const canvas1 = this.elementRef.nativeElement.querySelector('#myChart1');
    const ctx1 = canvas1.getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: '2022',
            data: this.lastYear,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: '2023',
            data: this.nowYear,
            backgroundColor: '#ff6384',
            fill: false,
            borderColor: '#ff6384',
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Revenue Dataset ',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,

              },
            },
          ],
        },
      },
    });

    console.log(this.ticketFood.food);
    console.log(this.ticketFood.ticket);
    const canvas2 = this.elementRef.nativeElement.querySelector('#myChart2');
    const ctx2 = canvas2.getContext('2d');
    const data = {
      datasets: [{
        label: [
          'Food',
          'Ticket',
        ],
        data: [this.ticketFood.food, this.ticketFood.ticket],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgb(54, 162, 235)',
          // 'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    new Chart(ctx2, {
      type: 'pie',
      data: data
    });
  }
}


