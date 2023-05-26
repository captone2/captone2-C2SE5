import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { TopMovie } from 'src/app/shared/model/dto/TopMovie';

@Component({
  selector: 'app-top-rate',
  templateUrl: './top-rate.component.html',
  styleUrls: ['./top-rate.component.css']
})
export class TopRateComponent implements OnInit {
  listMovieRate: TopMovie[] = []
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getTopMovie().subscribe(data => {
      this.listMovieRate = data;
      console.log(data)
    })
  }

}
