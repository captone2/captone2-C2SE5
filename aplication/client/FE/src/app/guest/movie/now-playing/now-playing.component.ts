import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Genre } from 'src/app/shared/model/entity/Genre';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {
  genreList: Genre[] = [] ;
  movieNow: MovieShowtime[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getListGenre();
    this.getListMovieNow();
  }
  getListGenre() {
    this.movieService.getAllGenre().subscribe(data => {
      this.genreList = data;
      console.log(data)
    })
  }

  getListMovieNow() {
    this.movieService.getMovieNow().subscribe(data => {
      this.movieNow = data;
      console.log(data)
    })
  }


  getListMovieNowByGenre(id: string) {
    this.movieService.getMovieNowByGenre(id).subscribe(data => {
      this.movieNow = data;
    })
  }


  changeGenre(genreId :any) {
    
    if (genreId == '' ) {
     this.getListMovieNow();
    } else {
    this.getListMovieNowByGenre(genreId);
    }
}
}
