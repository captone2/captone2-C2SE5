import {Component, Inject, OnInit} from '@angular/core';
import {ManagerMovieService} from '../../../services/manager-movie.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Account} from '../../../shared/model/entity/Account';
import {Genre} from '../../../shared/model/entity/Genre';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Price} from '../../../shared/model/entity/Price';
import {Movie} from '../../../shared/model/entity/Movie';
import {JsogService} from 'jsog-typescript';

@Component({
  selector: 'app-movie-add-admin',
  templateUrl: './movie-add-admin.component.html',
  styleUrls: ['./movie-add-admin.component.css']
})
export class MovieAddAdminComponent implements OnInit {
  constructor(
    private movieService: ManagerMovieService,
    private toastService: ToastrService,
    private router: Router,
    private active: ActivatedRoute,
    private jSogService: JsogService,
    private form: FormBuilder,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) {}
  genreList: Genre[];
  accountList: Account[];
  defaultImage = 'https://cdn.tgdd.vn/Files/2020/01/14/1231516/top-10-bo-phim-hanh-dong-dang-xem-nhat-moi-thoi-dai--cap-nhat-2020-7.jpg';
  checkUpLoad = false;
  priceList: Price[];
  movie: Movie;
  movieCheck: Movie[];
  showingFroms: any;
  showingTos: any;
  id: any;
  public dateNow = new Date();
  public min = new Date();
  // tslint:disable-next-line:variable-name
  validation_messages = {
    title: [
      {type: 'required', message: 'Vui lòng nhập tên phim.'},
      {type: 'pattern', message: 'Nhập tên phim không hợp lệ, không được kí tự đặc biệt. (abc, abc xyz)'},
      {type: 'minlength', message: 'Tên phim nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tên phim nhập tối đa 50 kí tự.'}
    ],
    showingFrom: [
      {type: 'required', message: 'Vui lòng nhập ngày bắt đầu.'},
      {type: 'minlength', message: 'Không được nhập ngày của quá khứ.'}
    ],
    showingTo: [
      {type: 'required', message: 'Vui lòng nhập kết thúc.'},
      {type: 'minlength', message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu.'}
    ],
    cast: [
      {type: 'required', message: 'Vui lòng nhập tên diễn viên.'},
      {type: 'pattern', message: 'Nhập tên diễn viên không hợp lệ, không được nhập số, kí tự đặc biệt. (abc, abc xyz)'},
      {type: 'minlength', message: 'Tên diễn viên nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tê diễn viên nhập tối đa 50 kí tự.'}
    ],
    director: [
      {type: 'required', message: 'Vui lòng nhập tên đạo diễn.'},
      {type: 'pattern', message: 'Nhập tên đạo diễn không hợp lệ, không được nhập số, kí tự đặc biệt. (abc, abc xyz)'},
      {type: 'minlength', message: 'Tên đạo diễn nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tên đạo diễn nhập tối đa 50 kí tự.'}
    ],
    releaseDate: [
      {type: 'required', message: 'Vui lòng nhập ngày khởi chiếu.'},
      {type: 'minlength', message: 'Không được nhập ngày của quá khứ.'},
      ],
    rated: [
      {type: 'required', message: 'Vui lòng chọn giới hạn độ tuổi.'},
      {type: 'pattern', message: 'Vui lòng nhập số.'}
    ],
    runningTime: [
      {type: 'required', message: 'Vui lòng thời lượng của phim. (đơn vị phút)'},
      {type: 'pattern', message: 'Nhập thời lượng không hợp lệ.'},
      {type: 'minlength', message: 'Thời lượng nhập tối thiểu 1 kí tự số.'},
      {type: 'maxlength', message: 'Thời lượng nhập tối đa 6 kí tự.'}
    ],
    production: [
      {type: 'required', message: 'Vui lòng nhập tên hãng phim.'},
      {type: 'pattern', message: 'Nhập tên hãng phim không hợp lệ.'},
      {type: 'minlength', message: 'Tên hãng phim nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tên hãng phim nhập tối đa 50 kí tự.'}

    ],
    trailerUrl: [
      {type: 'required', message: 'Vui lòng nhập trailer phim.'},
    ],
    content: [
      {type: 'required', message: 'Vui lòng nội dung mô tả của phim.'},
      {type: 'pattern', message: 'Nhập nội dung mô tả không hợp lệ, không được nhập kí tự đặc biệt. (abc, abc xyz)'},
      {type: 'minlength', message: 'Nội dung mô tả phim nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Nội dung mô tả phim nhập tối đa 200 kí tự.'}
    ],
    is3D: [
      {type: 'required', message: 'Vui lòng chọn phiên bản.'}
    ],
    accountId: [
      {type: 'required', message: 'Vui lòng chọn mã nhân viên.'},
    ],
    imageUrl: [
      {type: 'required', message: 'Vui lòng chọn ảnh.'},
    ],
  };

  createMovie = this.form.group({
    title: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
    showingFrom: ['', [Validators.required]],
    showingTo: ['', [Validators.required]],
    cast: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
    director: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
      Validators.minLength(3), Validators.maxLength(50)]],
    releaseDate: ['', [Validators.required]],
    rated: ['', [Validators.required]],
    runningTime: ['', [Validators.required, Validators.pattern('^[0-9]{1,6}$'),
      Validators.minLength(1), Validators.maxLength(6)]],
    production: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
  Validators.minLength(3), Validators.maxLength(50)]],
    trailerUrl: ['', [Validators.required]],
    content: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(200)]],
    is3D: ['', [Validators.required]],
    accountId: ['', [Validators.required]],
    genres: this.form.array([]),
    showtime: this.form.array([], Validators.required),
    imageUrl: this.form.array([])
  });

  // nhớ trừ ra phần tử đầu tiên
  imageUrl: any = [this.defaultImage];
  get imageUrls(){
    return this.createMovie.controls.imageUrl as FormArray;
  }

  addImageUrls(){
    const imageUrlForm = this.form.group({
      imageUrl: ['', Validators.required]
    });
    this.imageUrls.push(imageUrlForm);
  }
  deleteImage(i: number) {
    this.imageUrls.removeAt(i);
  }

  changeDate(e){
    console.log(e.value);
    this.min = new Date(e.value);
    this.checkDate();
  }

  selectFiles(e) {
    if (e.target.files) {
      this.checkUpLoad = true;
      for (let i = 0; File.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);

        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (e: any) => {
          this.checkUpLoad = false;
          this.imageUrl.push(e.target.result);
        };
      }
    }
  }

  checkDate(){
    // @ts-ignore
    const startDate = new Date(document.querySelector('#inputDateStart').value);
    // @ts-ignore
    const endDate = new Date(document.querySelector('#inputDateEnd').value);

    console.log(startDate);
    console.log(endDate);
    if (startDate < this.dateNow){
      this.toastService.error('Không được chọn ngày trong quá khứ', 'Thông báo');
    }

    // @ts-ignore
    if (endDate - 1 < startDate){
      this.toastService.error('Ngày kết thúc phải lớn hơn ngày bắt đầu', 'Thông báo');
    }

  }

  onCheckChange(e: any) {
    const genres: FormArray = this.createMovie.get('genres') as FormArray;
    if (e.target.checked) {
      genres.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      genres.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          genres.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit(): void {
    this.getListAllEmployee();
    this.getAllListGenre();
    this.getListALlPrice();
    this.active.paramMap.subscribe((paramMap) => {
      // tslint:disable-next-line:radix
      this.id = parseInt(paramMap.get('id'));
      console.log(this.id);
    });
      // @ts-ignore
    // this.createMovie.controls.imageUrl = this.defaultImage;
  }

  onSubmitCreate() {
    console.log(this.showtimes.value);
    console.log(this.imageUrl);
    this.checkUpLoad = true;

    this.createMovie.patchValue({accountId: this.id});
    console.log(this.createMovie.get('accountId').value);


    console.log(this.createMovie.value);
    this.movieService.createMovie(this.createMovie.value, this.id).subscribe(() => {
      this.checkUpLoad = false;
      this.createMovie.controls.imageUrl = this.imageUrl;
      console.log(this.createMovie.controls.imageUrl);
      this.toastService.success('Thêm mới thành công!', 'Thông báo');
      this.router.navigateByUrl('/list-movie');
    }, error => {
      this.toastService.error('Thêm mới thất bại!', 'Thông báo');
      this.checkUpLoad = false;
      return;
    });


  }

  getIdMovieByName(title){
    console.log(title.value);
    this.movieService.getListAllMovie().subscribe((data) => {
      // @ts-ignore
      this.movieCheck = this.jSogService.deserializeArray(data, Movie);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.movieCheck.length; i ++){
        if (this.movieCheck[i].title === title.value){
          this.toastService.error('Tên phim đã tồn tại!', 'thông báo');
          return;
        }
      }
    });
  }

  get showtimes() {
    return this.createMovie.controls.showtime as FormArray;
  }

  addShowtime(){
    const showtimeForm = this.form.group({
      showtime: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.showtimes.push(showtimeForm);
  }
  deleteShowtime(index: number) {
    this.showtimes.removeAt(index);
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  getListAllEmployee() {
    this.movieService.getListAccountByCodeEmployee().subscribe((data) => {
      // @ts-ignore
      this.accountList = this.jSogService.deserializeArray(data, Account);
    });
  }
  getListALlPrice(){
    this.movieService.getAllListPrice().subscribe((data) => {
      // @ts-ignore
      this.priceList = this.jSogService.deserializeArray(data, Price);
    });
  }
  getAllListGenre() {
    this.movieService.getAllListGenre().subscribe((data) => {
      // @ts-ignore
      this.genreList = this.jSogService.deserializeArray(data, Genre);
    });
  }

}
