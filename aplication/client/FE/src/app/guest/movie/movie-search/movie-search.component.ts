import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../../services/movie.service';
import {Movie} from '../../../shared/model/entity/Movie';
import {JsogService} from 'jsog-typescript';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../../../shared/model/entity/Comment';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies: Movie[];
  keyword: string;
  constructor(private movieService: MovieService, private jsogService: JsogService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const keyword = params.keyword;
      // @ts-ignore
      this.movieService.searchMovie(keyword).subscribe(
        data => {
          // @ts-ignore
          return this.movies = this.jsogService.deserializeArray(data, Movie);
        });
    });
  }

}
