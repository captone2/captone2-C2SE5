import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';

@Component({
  selector: 'app-showtime-list',
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.css']
})
export class ShowtimeListComponent implements OnInit {
  movieShowTimeList: MovieShowtime[] = [];
  pageSize: number = 5; 
    currentPage: number = 1; 
  constructor(private movieShowtime: MovieService) { }

  ngOnInit(): void {
    this.movieShowtime.getAllMovieShowtime().subscribe((data) => {
      this.movieShowTimeList = data;
      console.log(data)
      });
  }
  
  

}
