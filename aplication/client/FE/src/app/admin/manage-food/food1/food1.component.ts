import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-food1',
  templateUrl: './food1.component.html',
  styleUrls: ['./food1.component.css']
})
export class Food1Component implements OnInit {
  selectedDate: Date = new Date();
  player: YT.Player;
  id: string = "qDuKsiwS5xw";
  constructor(private elementRef: ElementRef) { }
  @ViewChild('myChart') myChart!: ElementRef;
  selectedOption: string = '';

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const canvas = this.elementRef.nativeElement.querySelector('#myChart');
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sample Dataset',
          data: [12, 19, 3, 5, 2, 3, 10],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  handleChange(option: string) {
    this.selectedOption = option;
  }

  handleMonthChange(month: string) {
    console.log('Tháng:', month);
  }

  handleYearChange(year: string) {
    console.log('Năm:', year);
  }

  savePlayer(player) {
    this.player = player;
    console.log("player instance", player);
  }
  onStateChange(event) {
    console.log("player state", event.data);
  }

}
