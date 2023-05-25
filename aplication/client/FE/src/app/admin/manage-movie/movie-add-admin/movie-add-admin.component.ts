import { Component, Inject, OnInit } from '@angular/core';
import { ManagerMovieService } from '../../../services/manager-movie.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Account } from '../../../shared/model/entity/Account';
import { Genre } from '../../../shared/model/entity/Genre';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Price } from '../../../shared/model/entity/Price';
import { Movie } from '../../../shared/model/entity/Movie';
import { JsogService } from 'jsog-typescript';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDTO1 } from 'src/app/shared/model/dto/MovieDTO1';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-movie-add-admin',
  templateUrl: './movie-add-admin.component.html',
  styleUrls: ['./movie-add-admin.component.css']
})
export class MovieAddAdminComponent implements OnInit {

  constructor(
    private movieService: ManagerMovieService,
    private movieService1: MovieService,
    private toastService: ToastrService,
    private router: Router,
    private active: ActivatedRoute,
    private jSogService: JsogService,
    private form: FormBuilder,
    private http: HttpClient,
    private imageService: FirebaseServiceService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) { }
  genreList: Genre[] = [];
  accountList: Account[];
  selectCheckbox: number[] = [];
  checkUpLoad = false;
  priceList: Price[];
  movie: Movie;

  movieCheck: Movie[];
  showingFroms: any;
  createMovie: FormGroup;
  addmovie: FormGroup;
  showingTos: any;
  uploadedAvatar = null;
  urlNoPoster = 'https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/no-poster.png?alt=media&token=149df9fa-1982-4cd2-8630-391c32b48665'
  id: any;
  public dateNow = new Date();
  public min = new Date();
  // tslint:disable-next-line:variable-name
  validation_messages = {
    title: [
      { type: 'required', message: 'Please enter movie title.' },
      { type: 'pattern', message: 'Invalid movie title, no special characters.' },
      { type: 'minlength', message: 'Movie title enter at least 3 characters.' },
      { type: 'maxlength', message: 'Movie title can enter up to 50 characters.' }
    ],
    cast: [
      { type: 'required', message: 'Please enter cast..' },
      { type: 'pattern', message: 'Invalid cast name' },
      { type: 'minlength', message: 'Cast name enter at least 3 characters.' },
      { type: 'maxlength', message: 'Enter cast name up to 50 characters.' }
    ],
    director: [
      { type: 'required', message: 'Please enter the director name.' },
      { type: 'pattern', message: 'Invalid director name input' },
      { type: 'minlength', message: 'The director name must be entered with at least 3 characters.' },
      { type: 'maxlength', message: 'The director name can be entered up to 50 characters.' }
    ],
    releaseDate: [
      { type: 'required', message: 'Please enter a release date.' },
      { type: 'minlength', message: 'Không được nhập ngày của quá khứ.' },
    ],
    runningTime: [
      { type: 'required', message: 'Please the duration of the movie. (unit of minutes)' },
      { type: 'pattern', message: 'Invalid duration input.' },
      { type: 'minlength', message: 'Minimum input duration is 1 numeric character.' },
      { type: 'maxlength', message: 'Maximum input duration is 6 characters.' }
    ],
    production: [
      { type: 'required', message: 'Please enter the studio name.' },
      { type: 'pattern', message: 'Invalid studio name input.' },
      { type: 'minlength', message: 'Studio name enter at least 3 characters.' },
      { type: 'maxlength', message: 'The studio name can be entered up to 200 characters.' }

    ],
    trailerUrl: [
      { type: 'required', message: 'Please enter movie trailer.' },
    ],
    content: [
      { type: 'required', message: 'Please describe the content of the movie.' },
      { type: 'pattern', message: 'Invalid description entered' },
      { type: 'minlength', message: 'The content of the movie description must be at least 3 characters.' },
      { type: 'maxlength', message: 'The content of the movie description can be up to 200 characters.' }
    ],
  };

  ngOnInit(): void {
    this.getListGenre();
    this.createMovie = this.form.group({
      title: ['', [Validators.required,
      Validators.minLength(3), Validators.maxLength(50)]],
      cast: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
      director: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
      releaseDate: ['', [Validators.required]],
      runningTime: ['', [Validators.required, Validators.pattern('^[0-9]{1,6}$'),
      Validators.minLength(1), Validators.maxLength(6)]],
      production: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(200)]],
      trailerUrl: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(200)]],
    });

  }

  onSubmitCreate() {
    console.log("Create")
    console.log(this.uploadedAvatar)
    console.log(this.selectCheckbox)
    const movie = new MovieDTO1();
    movie.title = this.createMovie.value.title;
    movie.cast = this.createMovie.value.cast;
    movie.director = this.createMovie.value.director;
    movie.releaseDate = this.createMovie.value.releaseDate;
    movie.runningTime = this.createMovie.value.runningTime;
    movie.production = this.createMovie.value.production;
    movie.trailerUrl = this.createMovie.value.trailerUrl;
    movie.content = this.createMovie.value.content;
    movie.genre = this.selectCheckbox;

    if (this.selectCheckbox.length == 0) {
      this.toastService.error('Please select movie genre!', 'Error: ');
    } else {

      // Upload img & download url
      if (this.uploadedAvatar !== null) {
        console.log("Có poster")
        console.log(movie)
        const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
        const fileRef = this.storage.ref(avatarName);
        this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              movie.imgUrl = url;
              this.addMovie(movie).subscribe(
                (data) => {
                  this.toastService.success('Add new movie successful !', 'Success: ');
                  this.ngOnInit();
                  this.router.navigateByUrl('/admin/movie')
                },
                (error: HttpErrorResponse) => {
                  this.toastService.error('Add new movie failed !', 'Error: ');
                }
              );
            });
          })
        ).subscribe();
      } else {
        console.log("Không có poster")
        movie.imgUrl = this.urlNoPoster;
        this.addMovie(movie).subscribe(
          (data) => {
            this.toastService.success('Add new movie successful!', 'Success: ');
            this.router.navigateByUrl('/admmin/movie');
          },
          (error: HttpErrorResponse) => {
            this.toastService.error('Add new movie failed !', 'Error: ');
          }
        );
      }
    }
  }

  getListGenre() {
    this.movieService1.getAllGenre().subscribe(data => {
      this.genreList = data;
      console.log(data)
    })
  }

  onCheckboxChange(event: any, id: number) {
    console.log(id)
    if (event.target.checked) {
      console.log("Check")
      this.selectCheckbox.push(id);
    } else {
      const index = this.selectCheckbox.indexOf(id);
      if (index > -1) {
        this.selectCheckbox.splice(index, 1);
      }
    }
    console.log(this.selectCheckbox)
  }


  private getCurrentDateTime() {
    return new Date().getTime();
  }

  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    const type = event.target.files[0].type;
    console.log(type)
    if (type !== 'image/jpeg' && type !== 'image/png') {
      console.log("Lỗi")
      this.toastService.error('The requested file format is incorrect!', 'Error: ');
    } else {
      if (this.uploadedAvatar) {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedAvatar);
        reader.onload = (e: any) => {
          this.urlNoPoster = e.target.result;
        };
      }
    }
  }

  addMovie(movie: MovieDTO1): Observable<any> {
    const url = `http://localhost:8080/api/auth/movie/add`;
    return this.http.post(url, movie);
  }
}
