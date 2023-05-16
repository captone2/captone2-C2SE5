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
  uploadedAvatar = null;
  movieCheck: Movie[];
  showingFroms: any;
  createMovie: FormGroup;
  addmovie: FormGroup;
  showingTos: any;
  urlNoPoster = 'https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/no-poster.png?alt=media&token=149df9fa-1982-4cd2-8630-391c32b48665'
  id: any;
  public dateNow = new Date();
  public min = new Date();
  // tslint:disable-next-line:variable-name
  validation_messages = {
    title: [
      { type: 'required', message: 'Vui lòng nhập tên phim.' },
      { type: 'pattern', message: 'Tên phim không hợp lệ, không được kí tự đặc biệt. (abc, abc xyz)' },
      { type: 'minlength', message: 'Tên phim nhập tối thiểu 3 kí tự.' },
      { type: 'maxlength', message: 'Tên phim nhập tối đa 50 kí tự.' }
    ],
    cast: [
      { type: 'required', message: 'Vui lòng nhập diễn viên.' },
      { type: 'pattern', message: 'Tên diễn viên không hợp lệ, không được nhập số, kí tự đặc biệt. (abc, abc xyz)' },
      { type: 'minlength', message: 'Tên diễn viên nhập tối thiểu 3 kí tự.' },
      { type: 'maxlength', message: 'Tê diễn viên nhập tối đa 50 kí tự.' }
    ],
    director: [
      { type: 'required', message: 'Vui lòng nhập tên đạo diễn.' },
      { type: 'pattern', message: 'Nhập tên đạo diễn không hợp lệ, không được nhập số, kí tự đặc biệt. (abc, abc xyz)' },
      { type: 'minlength', message: 'Tên đạo diễn nhập tối thiểu 3 kí tự.' },
      { type: 'maxlength', message: 'Tên đạo diễn nhập tối đa 50 kí tự.' }
    ],
    releaseDate: [
      { type: 'required', message: 'Vui lòng nhập ngày khởi chiếu.' },
      { type: 'minlength', message: 'Không được nhập ngày của quá khứ.' },
    ],
    runningTime: [
      { type: 'required', message: 'Vui lòng thời lượng của phim. (đơn vị phút)' },
      { type: 'pattern', message: 'Nhập thời lượng không hợp lệ.' },
      { type: 'minlength', message: 'Thời lượng nhập tối thiểu 1 kí tự số.' },
      { type: 'maxlength', message: 'Thời lượng nhập tối đa 6 kí tự.' }
    ],
    production: [
      { type: 'required', message: 'Vui lòng nhập tên hãng phim.' },
      { type: 'pattern', message: 'Nhập tên hãng phim không hợp lệ.' },
      { type: 'minlength', message: 'Tên hãng phim nhập tối thiểu 3 kí tự.' },
      { type: 'maxlength', message: 'Tên hãng phim nhập tối đa 50 kí tự.' }

    ],
    trailerUrl: [
      { type: 'required', message: 'Vui lòng nhập trailer phim.' },
    ],
    content: [
      { type: 'required', message: 'Vui lòng nội dung mô tả của phim.' },
      { type: 'pattern', message: 'Nhập nội dung mô tả không hợp lệ, không được nhập kí tự đặc biệt. (abc, abc xyz)' },
      { type: 'minlength', message: 'Nội dung mô tả phim nhập tối thiểu 3 kí tự.' },
      { type: 'maxlength', message: 'Nội dung mô tả phim nhập tối đa 200 kí tự.' }
    ],
    // images: [
    //   {type: 'required', message: 'Vui lòng chọn ảnh.'},
    // ],
  };



  ngOnInit(): void {
    this.createMovie = this.form.group({
      title: ['', [Validators.required,
      Validators.minLength(3), Validators.maxLength(50)]],
      cast: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
      // director: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
      // Validators.minLength(3), Validators.maxLength(50)]],
      releaseDate: ['', [Validators.required]],
      runningTime: ['', [Validators.required, Validators.pattern('^[0-9]{1,6}$'),
      Validators.minLength(1), Validators.maxLength(6)]],
      production: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
      trailerUrl: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(200)]],
      // images: this.form.array([])
    });
    this.getListGenre();
    this.active.paramMap.subscribe((paramMap) => {
      // tslint:disable-next-line:radix
      this.id = parseInt(paramMap.get('id'));
      console.log(this.id);
    });
  }

  onSubmitCreate() {

    if (this.selectCheckbox.length == 0) {
      this.toastService.error('Vui lòng lựa chọn thể loại phim!', 'Error: ');
    } else {
      const movie = new MovieDTO1();
      movie.title = this.createMovie.value.title;
        movie.cast = this.createMovie.value.cast;
        movie.director = this.createMovie.value.director;
        movie.releaseDate = this.createMovie.value.releaseDate;
        movie.runningTime = this.createMovie.value.runningTime;
        movie.production = this.createMovie.value.production;
        movie.trailerUrl = this.createMovie.value.trailerUrl;
        movie.content = this.createMovie.value.content;
        movie.genres = this.selectCheckbox;
      // Upload img & download url
      if (this.uploadedAvatar !== null) {
        const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
        const fileRef = this.storage.ref(avatarName);
        this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              movie.movieImage = url;
              this.addMovie(movie).subscribe(
                (data) => {
                  this.toastService.success('Thêm mới thành công!', 'Success: ');
                  this.ngOnInit();
                },
                (error: HttpErrorResponse) => {
                  this.toastService.error('Thêm mới thất bài!', 'Error: ');
                }
              );
            });
          })
        ).subscribe();
      } else {
        movie.movieImage = this.urlNoPoster;
        this.addMovie(movie).subscribe(
          (data) => {
            this.toastService.success('Thêm mới thành công!', 'Success: ');
            this.router.navigateByUrl('/admmin/movie');
          },
          (error: HttpErrorResponse) => {
            this.toastService.error('Thêm mới thất bài!', 'Error: ');
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
  addMovie(movie: MovieDTO1): Observable<any> {
    const url = `http://localhost:8080/api/auth/movie/add`;
    return this.http.post(url, movie);
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }

  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    const type = event.target.files[0].type;
    if (type !== 'image/jpeg' && type !== 'image/png') {
      this.toastService.error('Định dạng tệp được yêu cầu không chính xác!', 'Error: ');
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
}
