import { Component, OnInit } from '@angular/core';
import {Movie} from '../../model/entity/Movie';
import {MovieService} from '../../../services/movie.service';
import {JsogService} from 'jsog-typescript';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    ]
})
export class HeaderComponent implements OnInit {
  keyword = '';
  url = 'assets/js/main.js';
  loadAPI: any;
  movieSearches: Movie[];
  idAccount: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  constructor(private movieService: MovieService, private jsog: JsogService,
              private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user);

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.displayName;
      console.log(user.id);
      this.idAccount = user.id;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = ('/login');
  }
  
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  
  // suggestMovie(){
  //   this.movieService.searchMovie(this.keyword).subscribe(data => {
  //     // @ts-ignore
  //     this.movieSearches = this.jsog.deserializeArray(data, Movie);
  //   });
  // }
 
  // searchMovie(){
  //   this.router.navigateByUrl('/movie-search?keyword=' + this.keyword);
  // }
}
