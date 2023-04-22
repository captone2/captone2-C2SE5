import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';
import { DataEditing } from '@syncfusion/ej2-angular-charts';
import { MovieShowtimeDTO } from 'src/app/shared/model/dto/MovieShowTimeDTO';

@Component({
  selector: 'app-show-time',
  templateUrl: './show-time.component.html',
  styleUrls: ['./show-time.component.css']
})
export class ShowTimeComponent implements OnInit {
  dateList: String[] = [];
  listMovieShowTime: MovieShowtimeDTO[] = [] ;
  constructor(private movieService : MovieService) { }

  ngOnInit(): void {
    this.getListDateShowTime();
    this.getListMovieShowTime('');
  }


  getListDateShowTime() {
    const today: Date = new Date();
    
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    
    const formatter = new Intl.DateTimeFormat('vi-VN', options);
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const formattedDate = formatter.format(date);
      
      // Chuyển đổi định dạng ngày tháng từ "dd/MM/yyyy" sang "yyyy-MM-dd"
      const parts = formattedDate.split("/");
      const newFormattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
      
      this.dateList.push(newFormattedDate);
    }
    
    console.log(this.dateList);
  }
  

  getListMovieShowTime(date: string) {
    if (date == '') {
      const today = new Date();
      const vietnamTime = new Date(today.getTime() + (7 * 60 * 60 * 1000));
      date = vietnamTime.toISOString().slice(0, 10);
    } 
    console.log(date)
    this.movieService.getMovieShowingByDate(date).subscribe(data => {

        const groupedMovies = data.reduce((accumulator, currentValue) => {
          const title = currentValue.movie.title;
          if (!accumulator[title]) {
            accumulator[title] = [];
          }
          accumulator[title].push(currentValue);
          return accumulator;
        }, {});

        this.listMovieShowTime  = Object.keys(groupedMovies).map((title) => {
          const movieGroup = groupedMovies[title];
          const movie = movieGroup[0].movie;
          const screen = movieGroup[0].screen;
          const showtimes = movieGroup.map((item) => item.showtime);
          return new MovieShowtimeDTO(movie.id, movieGroup[0].showDate, movie, showtimes, screen);
        });
        console.log(this.listMovieShowTime)
     })  
  }
  
}

