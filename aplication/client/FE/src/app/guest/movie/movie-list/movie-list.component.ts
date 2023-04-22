import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../../services/movie.service';
import {Movie} from '../../../shared/model/entity/Movie';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {JsogService, JsonProperty} from 'jsog-typescript';
import {MovieTopFive} from '../../../shared/model/dto/MovieTopFive';
import {TokenStorageService} from '../../../services/token-storage.service';



@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  constructor(private movieService: MovieService,
              private jsogService: JsogService,
              private tokenStorageService: TokenStorageService) {
  }

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  private roles: string[];

  movieShowings: Movie[];
  movieComings: Movie[];
  movieTopFives: Movie[];

  customOptions: OwlOptions = {
    merge: true,
    center: true,
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    // margin: 20,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };

  customBanner: OwlOptions = {
    merge: true,
    center: true,
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    // margin: 20,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user);

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
    // end AnhLT
    this.movieService.getMovieShowing().subscribe(data => {
      // @ts-ignore
      this.movieShowings = this.jsogService.deserializeArray(data, Movie);
    });
    this.movieService.getMovieComingSoon().subscribe(data => {
      // @ts-ignore
      this.movieComings = this.jsogService.deserializeArray(data, Movie);
    });
    this.movieService.getMovieTopFive().subscribe(data => {
      // @ts-ignore
      this.movieTopFives = this.jsogService.deserializeArray(data, Movie);
    });
  }
}
