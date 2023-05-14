
import {UserService} from '../services/user.service';
import {MovieService} from "../services/movie.service";
import {Movie} from "../shared/model/entity/Movie";
import { TokenStorageService } from '../services/token-storage.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Genre } from '../shared/model/entity/Genre';
import { SlidesOutputData } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
]
})
export class HomeComponent implements OnInit {

  public movieList: Movie[];
  movieListSearch: Movie[];
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('modalPayment') modalPayment: ElementRef;
  @ViewChild('modalTrailer') modalTrailer: ElementRef;
  @ViewChild('videoMain') videoMain: ElementRef;
  constructor(private movieService : MovieService, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
   
    this.movieService.getMovieShowing().subscribe((data) => {
       this.movieList = data;
      console.log(data)
    });
  }

  searchMovie(value: string) {
    console.log(value)
    this.movieService.getMovieByTitle(value).subscribe((data) => {
      this.movieListSearch = data;
      console.log(data)
   });
  }

  closeModal() {
    this.modalPayment.nativeElement.style.animation = 'topdown 0.5s ease-in-out forwards';
    this.modalTrailer.nativeElement.style.animation = 'topdown 0.5s ease-in-out forwards';
    this.videoMain.nativeElement.pause();
    this.overlay.nativeElement.style.display = 'none';
  }




  convertTime(id: number) {
    const minutes: number = id;
    const date: Date = new Date(0, 0, 0, 0, minutes);
    const hours: number = date.getHours();
    const formattedMinutes: string = ('0' + date.getMinutes()).slice(-2);
    const formattedTime: string = ('0' + hours).slice(-2) + ' hours ' + formattedMinutes + ' minutes';
    return formattedTime
  }

  convertGenre(arr: Genre[]) {
    return arr.map(genre => genre.name).join(', ');
  }
}
