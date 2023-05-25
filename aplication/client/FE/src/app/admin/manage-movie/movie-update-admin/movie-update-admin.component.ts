import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDTO1 } from 'src/app/shared/model/dto/MovieDTO1';
import { Genre } from 'src/app/shared/model/entity/Genre';
import { Movie } from 'src/app/shared/model/entity/Movie';

@Component({
  selector: 'app-movie-update-admin',
  templateUrl: './movie-update-admin.component.html',
  styleUrls: ['./movie-update-admin.component.css']
})
export class MovieUpdateAdminComponent implements OnInit {
  createMovie: FormGroup;
  
  movieDetail: Movie;
  uploadedAvatar = null;
 
  genreList: Genre[] = [];
  urlNoPoster = 'https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/no-poster.png?alt=media&token=149df9fa-1982-4cd2-8630-391c32b48665'

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,private form: FormBuilder , private http: HttpClient, private router: Router,  private toastService: ToastrService, private movieService: MovieService, private activatedRoute: ActivatedRoute, private movieService1: MovieService,) {
    this.createMovie = this.form.group({
      id: [''],
      title: ['', [Validators.required,
      Validators.minLength(3), Validators.maxLength(50)]],
      cast: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.minLength(3), Validators.maxLength(200)]],
      director: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
      releaseDate: ['', [Validators.required]],
      runningTime: ['', [Validators.required, Validators.pattern('^[0-9]{1,6}$'),
      Validators.minLength(1), Validators.maxLength(6)]],
      production: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(200)]],
      trailerUrl: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(600)]],
      // images: this.form.array([])
    });
   }
   selectCheckbox: number[] = [];
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
    this.getMovieDetail();
  

  
    this.getListGenre();
    
  }

   getMovieDetail() {
    const idMovie = parseInt(this.activatedRoute.snapshot.params['id']);
    this.movieService.findMovieById(idMovie).subscribe(data => {
      this.movieDetail = data;
      console.log(data)
           this.createMovie.controls.id.setValue(this.movieDetail.id);
      this.selectCheckbox = this.movieDetail.genres.map((genre: Genre) => genre.id);
      console.log(this.selectCheckbox)
      this.urlNoPoster = this.movieDetail.movieImages[0].imageUrl;
      this.createMovie.controls.id.setValue(this.movieDetail.id);
      this.createMovie.controls.title.setValue(this.movieDetail.title);
      this.createMovie.controls.cast.setValue(this.movieDetail.cast);
      this.createMovie.controls.director.setValue(this.movieDetail.director);
      this.createMovie.controls.releaseDate.setValue(this.movieDetail.releaseDate);
      this.createMovie.controls.runningTime.setValue(this.movieDetail.runningTime);
      this.createMovie.controls.production.setValue(this.movieDetail.production);
      this.createMovie.controls.trailerUrl.setValue(this.movieDetail.trailerUrl);
      this.createMovie.controls.content.setValue(this.movieDetail.content);
      this.urlNoPoster = this.movieDetail[0].imageUrl;
      
    }, (error) => {
      this.toastService.error('Movie do not exist!', 'Error: ');
      this.router.navigate(['/admin/movie']);
    });
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
      console.log("Uncheck")
      const index = this.selectCheckbox.indexOf(id);
      if (index > -1) {
        this.selectCheckbox.splice(index, 1);
      }
    }
    console.log(this.selectCheckbox)
  }
  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    const type = event.target.files[0].type;
    if (type !== 'image/jpeg' && type !== 'image/png') {
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
 

  onSubmitCreate() {
    if (this.selectCheckbox.length == 0) {
      this.toastService.error('Vui lòng lựa chọn thể loại phim!', 'Lỗi: ');
    } else {
      const movie = new MovieDTO1();
      movie.id = this.createMovie.value.id;
      movie.title = this.createMovie.value.title;
      movie.cast = this.createMovie.value.cast;
      movie.director = this.createMovie.value.director;
      movie.releaseDate = this.createMovie.value.releaseDate;
      movie.runningTime = this.createMovie.value.runningTime;
      movie.production = this.createMovie.value.production;
      movie.trailerUrl = this.createMovie.value.trailerUrl;
      movie.content = this.createMovie.value.content;
      movie.genre = this.selectCheckbox;
      // Upload img & download url
      if (this.uploadedAvatar !== null) {
        console.log(movie)
        const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
        const fileRef = this.storage.ref(avatarName);
        this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              movie.imgUrl = url;
              this.updateMovie(movie).subscribe(
                (data) => {
                  this.toastService.success('Update successful movie!', 'Success: ');
                  this.router.navigateByUrl('/admin/movie');
                },
                (error: HttpErrorResponse) => {
                  this.toastService.error('Update failed movie!', 'Error: ');
                }
              );
            });
          })
        ).subscribe();
      } else {
        
        movie.imgUrl = this.urlNoPoster;
        console.log(movie)
        this.updateMovie(movie).subscribe(
          (data) => {
            this.toastService.success('Update successful movie!', 'Success: ');
            this.router.navigateByUrl('/admin/movie');
          },
          (error: HttpErrorResponse) => {
            this.toastService.error('Update failed movie!', 'Error: ');
          }
        );
      }
    }
  }

  updateMovie(movie: MovieDTO1): Observable<any> {
    const url = `http://localhost:8080/api/auth/movie/update`;
    return this.http.post(url, movie);
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }

  checkChecked(id: number) {
    this.selectCheckbox = this.movieDetail.genres.map(genre => genre.id)
    return this.selectCheckbox.includes(id)
  }
}
