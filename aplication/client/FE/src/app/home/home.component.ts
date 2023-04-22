
import {UserService} from '../services/user.service';
import {MovieService} from "../services/movie.service";
import {Movie} from "../shared/model/entity/Movie";
import { TokenStorageService } from '../services/token-storage.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url = 'assets/js/main.js';
  loadAPI: any;
  public movieList: Movie[];
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('modalPayment') modalPayment: ElementRef;
  @ViewChild('modalTrailer') modalTrailer: ElementRef;
  @ViewChild('videoMain') videoMain: ElementRef;
  constructor(private movieService : MovieService, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
    this.movieService.getMovieShowing().subscribe((data) => {
       this.movieList = data;
      console.log(data)
    });
  }

  closeModal() {
    this.modalPayment.nativeElement.style.animation = 'topdown 0.5s ease-in-out forwards';
    this.modalTrailer.nativeElement.style.animation = 'topdown 0.5s ease-in-out forwards';
    this.videoMain.nativeElement.pause();
    this.overlay.nativeElement.style.display = 'none';
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
