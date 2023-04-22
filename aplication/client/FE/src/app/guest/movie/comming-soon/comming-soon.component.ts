import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';
import * as _ from 'lodash';
import { CommingSoonDTO } from 'src/app/shared/model/dto/CommingSoonDTO';
@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.css']
})
export class CommingSoonComponent implements OnInit {
  movieList: MovieShowtime[] = [];
  movieConvert: CommingSoonDTO[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getListDate();
  }



  getListDate() {
    this.movieService.getMovieShowingByYear().subscribe(data => {
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
        movie: [],
        about: about
      });
    }
    console.log(this.movieList)


    this.movieList.forEach(show => {
      const showDate = new Date(show.showDate);
      this.movieConvert.forEach(week => {
        const [startStr, endStr] = week.about.split(' - ');
        const start = new Date(startStr);
        const end = new Date(endStr);
        const date = new Date(show.showDate);
        const isInRange = date >= start && date <= end;
        if (isInRange) {
          week.movie.push(show);
        }
      });
    });
    this.movieConvert = this.movieConvert.filter((movie) => movie.movie.length > 0);
    

  
    console.log(this.movieConvert)
  }



}
