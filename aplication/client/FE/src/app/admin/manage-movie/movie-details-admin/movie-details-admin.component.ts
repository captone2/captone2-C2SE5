import {Component, OnInit, ViewChild} from '@angular/core';
import {Movie} from '../../../shared/model/entity/Movie';
import {Showtime} from '../../../shared/model/entity/Showtime';
import {MovieImage} from '../../../shared/model/entity/MovieImage';
import {ManagerMovieService} from '../../../services/manager-movie.service';
import {ActivatedRoute} from '@angular/router';
import {Genre} from '../../../shared/model/entity/Genre';
import {JsogService} from 'jsog-typescript';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details-admin',
  templateUrl: './movie-details-admin.component.html',
  styleUrls: ['./movie-details-admin.component.css']
})
export class MovieDetailsAdminComponent implements OnInit {

  constructor(
    private movieService: ManagerMovieService,
    private active: ActivatedRoute,
    private jSogService: JsogService,
    public sanitizer: DomSanitizer
  ) { }
  movieDetail: Movie;
  genres: Genre[];
  showtimes: Showtime[];
  images: MovieImage[];

  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  ngOnInit(): void {
    // this.getMovieById();



  }

  // getMovieById(){
  //   this.movieService.getMovieById(this.active.snapshot.params.id).subscribe((data) => {
  //     // @ts-ignore
  //     this.movieDetail = this.jSogService.deserializeObject(data, Movie);
  //     console.log(this.movieDetail);
  //     this.genres = this.movieDetail.genres;
  //     this.showtimes = this.movieDetail.showtimes;
  //     this.images = this.movieDetail.movieImages;

  //     console.log(this.genres);
  //     console.log(this.showtimes);
  //     console.log(this.images);
  //   });
  // }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  videoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.movieDetail.trailerUrl);
  }
}
