import {Component, OnInit} from '@angular/core';
import {Movie} from '../../../shared/model/entity/Movie';
import {ActivatedRoute} from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Genre } from 'src/app/shared/model/entity/Genre';

@Component({
  selector: 'app-movie-details-admin',
  templateUrl: './movie-details-admin.component.html',
  styleUrls: ['./movie-details-admin.component.css']
})
export class MovieDetailsAdminComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
  ) { }
  id: number;
  movie: Movie;

  ngOnInit(): void {
   this.getMovieDetail();
  }
  getMovieDetail() {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.movieService.findMovieById(this.id).subscribe(data => {
      this.movie = data ;
      console.log(data)
    })
  }

  convertGenre(arr: Genre[]) {
    return arr.map(genre => genre.name).join(', ');
  }
}
