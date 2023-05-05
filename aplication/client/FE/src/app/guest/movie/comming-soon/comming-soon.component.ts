import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';
import * as _ from 'lodash';
import { CommingSoonDTO } from 'src/app/shared/model/dto/CommingSoonDTO';
import { Genre } from 'src/app/shared/model/entity/Genre';
import { log } from 'console';
@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.css']
})
export class CommingSoonComponent implements OnInit {
  movieList: MovieShowtime[] = [];
  movieConvert: CommingSoonDTO[] = [];
  genreList: Genre[] = [] ;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getListDate();
    this.getListGenre();
  }

  getListGenre() {
    this.movieService.getAllGenre().subscribe(data => {
      this.genreList = data;
    })
  }

  getListDate() {
    this.movieService.getMovieShowingByYear().subscribe(data => {
      this.movieList = data;
      this.getListConvert();
    })
  }

  getListMovieGenre(id: string) {
    this.movieService.getMovieShowingByYearAndGenre(id).subscribe(data => {
      this.movieList = data;
      this.getListConvert();
    })
  }

  getListConvert() {
    const currentWeek = moment().isoWeek();
    const currentYear = new Date().getFullYear(); // lấy năm hiện tại
    for (let i = currentWeek + 1; i <= 52; i++) {
      const startDate = moment().year(currentYear).isoWeek(i).startOf('isoWeek').format('DD/MM');
      const endDate = moment().year(currentYear).isoWeek(i).endOf('isoWeek').format('DD/MM');
      const about = `${moment().year(currentYear).isoWeek(i).startOf('isoWeek').format('yyyy-MM-DD')} - ${moment().year(currentYear).isoWeek(i).endOf('isoWeek').format('yyyy-MM-DD')}`;
      this.movieConvert.push({
        week: `#${i}`,
        day: `${startDate} - ${endDate}`,
        movieShowTime: [],
        about: about
      });
    }
    console.log(this.movieList)


    this.movieList.forEach(show => {
      this.movieConvert.forEach(week => {
        const [startStr, endStr] = week.about.split(' - ');
        const start = new Date(startStr);
        const end = new Date(endStr);
        const date = new Date(show.showDate);
        const isInRange = date >= start && date <= end;
        if (isInRange && this.isMovieExist(week.movieShowTime,show) === false) {
            week.movieShowTime.push(show);
        }
      });
    });
    this.movieConvert = this.movieConvert.filter((movie) => movie.movieShowTime.length > 0);
    

  
    console.log(this.movieConvert)
  }


  isMovieExist(arr: any[], movie1: MovieShowtime): boolean {
    return arr.some(item => item.movie.id === movie1.movie.id && item.showDate === movie1.showDate);
  }

  changeGenre(genreId :any) {
    
      if (genreId == '' ) {
        this.movieConvert = [];
        this.getListDate();
      } else {
        this.movieConvert = [];
        this.getListMovieGenre(genreId)
      }
  }
}
