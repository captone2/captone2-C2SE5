import { ScreenService } from './../../../services/ScreenService';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie } from '../../../shared/model/entity/Movie';
import { Screen } from '../../../shared/model/entity/Screen';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Genre } from 'src/app/shared/model/entity/Genre';
import { DateDTO } from 'src/app/shared/model/dto/DateDTO';
import { Thickness } from '@syncfusion/ej2-angular-charts';
import { Showtime } from 'src/app/shared/model/entity/Showtime';
import { MovieShowtime } from 'src/app/shared/model/entity/MovieShowtime';
import { SlidesOutputData } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-details-admin',
  templateUrl: './movie-details-admin.component.html',
  styleUrls: ['./movie-details-admin.component.css']
})
export class MovieDetailsAdminComponent implements OnInit {
  player: YT.Player;
  id: string = "qDuKsiwS5xw";
  currentDateTime: string;
  dateDTO: DateDTO[] = [];
  selectedDate: string = '';
  screenList: Screen[] = [];
  screenSelect: number = 0;
  showTimeList: Showtime[];
  showTimeListChoose: number[];
  showTimeListExist: MovieShowtime[] = [];
  showTimeListExistCopy: MovieShowtime[] = [];
  first: MovieShowtime;
  listShowTimeSelect: any[] = [];
  constructor(
    private screenService: ScreenService,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastrService,
  ) {
    // const vietnamTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    // this.currentDateTime = new Date(vietnamTime).toISOString();
    // this.currentDateTime = this.currentDateTime.split('T')[0];
  }
  id1: number;
  movie: Movie;

  ngOnInit(): void {
    this.listShowTimeSelect = []
    this.currentDateTime = new Date().toISOString();
    this.currentDateTime = this.currentDateTime.split('T')[0];
    this.screenSelect = 0;
    this.getMovie();
    this.getMovieDetail();
    this.getAllScreen();
    this.getAllShowTime();
  }
  getMovieDetail() {
    this.id1 = parseInt(this.activatedRoute.snapshot.params['id']);
    this.movieService.findMovieById(this.id1).subscribe(data => {
      this.movie = data;
      this.id = this.movie.trailerUrl.split('v=')[1]
    })
  }

  convertGenre(arr: Genre[]) {
    return arr.map(genre => genre.name).join(', ');
  }

  savePlayer(player) {
    this.player = player;

  }
  onStateChange(event) {

  }

  getMovie() {
    const idMovie = parseInt(this.activatedRoute.snapshot.params['id']);
    this.movieService.getMovieShowtimeByMovieId(idMovie).subscribe(data => {
      const dateList: DateDTO[] = data.reduce((acc: DateDTO[], obj: any) => {
        const existingDateDTO = acc.find((d: DateDTO) => d.day === obj.showDate);
        if (existingDateDTO) {
          existingDateDTO.showtime.push({ id: obj.id, time: obj.showtime.showTime });
        } else {
          acc.push({ day: obj.showDate, showtime: [{ id: obj.id, time: obj.showtime.showTime }] });
        }
        return acc;
      }, []);
      this.dateDTO = dateList;
      this.dateDTO.sort((a, b) => {
        // Compare by day
        if (a.day < b.day) {
          return -1;
        } else if (a.day > b.day) {
          return 1;
        } else {
          // If day is the same, compare by time
          const aTime = a.showtime[0].time;
          const bTime = b.showtime[0].time;
          if (aTime < bTime) {
            return -1;
          } else if (aTime > bTime) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      for (let i = 0; i < this.dateDTO.length; i++) {
        this.dateDTO[i].showtime.sort((a, b) => {
          if (a.time < b.time) {
            return -1;
          } else if (a.time > b.time) {
            return 1;
          } else {
            return 0;
          }
        });

      }
      console.log(this.dateDTO)
    }, (error) => {
    });
  }

  onDateChange() {
    const selectedDateInput = document.getElementById('selectedDate') as HTMLInputElement;
    this.selectedDate = selectedDateInput.value;
    if (this.screenSelect != 0) {
      this.getListMovieShowTimeExist();
    }
  }

  getAllScreen() {
    this.screenService.findAll().subscribe(data => {
      this.screenList = data;

    })
  }

  changeScreen(idScreen: number) {
    this.screenSelect = idScreen;
    this.getListMovieShowTimeExist();
  }

  getAllShowTime() {
    this.movieService.getAllShowTime().subscribe(data => {
      this.showTimeList = data;

      this.showTimeList = this.sortArrayByShowTime(this.showTimeList)
      console.log(this.showTimeList)
    })
  }

  getListMovieShowTimeExist() {
    const body = {
      movieId: parseInt(this.activatedRoute.snapshot.params['id']),
      showDate: this.selectedDate,
      screenId: this.screenSelect
    };
    this.movieService.getMovieTimeByDateAndScreen(body).subscribe(data => {
      this.showTimeListExist = data;
      this.showTimeListExistCopy = JSON.parse(JSON.stringify(data))
      console.log(data)

    })
  }

  addShowtime(target: any, showtime: any) {
    console.log('Trước khi add: ')
    let checkAdd: boolean = false;
    const targetTimePlusMinutes = this.addMinutesToTime(showtime.showTime, this.movie.runningTime + 20);
    const index1 = this.showTimeList.findIndex(item => item.showTime === showtime.showTime);
    console.log(showtime.showTime)
    console.log(index1)
    const index2 = this.showTimeList.findIndex(item => item.showTime > targetTimePlusMinutes) ;
    console.log(targetTimePlusMinutes)
    console.log(index2)
    // Lấy các khung giờ ở giữa
    const middleShowTimes = [];
    for (let i = index1 + 1; i < index2; i++) {
      middleShowTimes.push(this.showTimeList[i].showTime);
    }
    console.log(middleShowTimes)
    middleShowTimes.forEach(time => {
      if(this.showTimeListExist.some(item => item.showtime.showTime === time)) {
        if(targetTimePlusMinutes > time) {
          checkAdd = true;
        }
      }
      
    });

    if (checkAdd && this.showTimeListExist.length > 0) {
      this.toastService.error('Add invalid showtime!', 'Error:');
    } else {
      if (this.showTimeListExist.some(item => item.showtime.showTime === showtime.showTime)) {
        target.classList.remove('showtime-active');
        this.showTimeListExist = this.showTimeListExist.filter(item => !(item.showtime.id === showtime.id && item.showtime.showTime === showtime.showTime));
        this.listShowTimeSelect = this.listShowTimeSelect.filter(number => number !== showtime.id);
        console.log('Sau khi remove: ' + this.showTimeListExist)

      } else {
        target.classList.add('showtime-active');
        const movieShowtimeCopy = new MovieShowtime;
        movieShowtimeCopy.showtime = showtime;
        movieShowtimeCopy.movie = this.movie;
        this.showTimeListExist.push(movieShowtimeCopy);
        this.listShowTimeSelect.push(showtime.id)
        console.log(this.showTimeListExist)
      }
    }
  }


  checkShowtime(showTime: any) {
    let isFound: boolean = false;
    const index = this.showTimeList.findIndex(item => item.showTime === showTime);

    if (this.showTimeListExistCopy.some(item => item.showtime.showTime === showTime)) {
      isFound = true
    } else {
      if (index > 0) {
        const movieShowTimeNew = this.showTimeList.slice(0, index);
        for (const item1 of movieShowTimeNew) {
          const movieShowTime = this.showTimeListExist.find(item => item.showtime.showTime === item1.showTime);
          if (movieShowTime) {
            const showTimePlusRunningTime: string = this.addTime(movieShowTime.showtime.showTime, movieShowTime.movie.runningTime + 17);
            isFound = this.compareTime(showTimePlusRunningTime, showTime);
            if (isFound == true) {
              break;
            }
          }
        }
      }
    }


    return isFound;
  }
  sortArrayByShowTime(array: Showtime[]): Showtime[] {
    return array.sort((a, b) => {
      const timeA = new Date('1970/01/01 ' + a.showTime);
      const timeB = new Date('1970/01/01 ' + b.showTime);
      return timeA.getTime() - timeB.getTime();
    });
  }

  compareTime(time1: string, time2: string): boolean {
    return time1 > time2;
  }


  addTime(time: string, minutes: number): string {
    const [hours, mins, secs]: number[] = time.split(':').map(Number);
    const totalMinutes: number = hours * 60 + mins + minutes;
    const newHours: number = Math.floor(totalMinutes / 60);
    const newMinutes: number = totalMinutes % 60;
    return `${this.padZero(newHours)}:${this.padZero(newMinutes)}:${this.padZero(secs)}`;
  }

  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }


  init() {
    console.log("Init")
    this.ngOnInit();
  }

  createShowtime() {
    const body = {
      movieId: parseInt(this.activatedRoute.snapshot.params['id']),
      showDate: this.selectedDate,
      screenId: this.screenSelect,
      showTime: this.listShowTimeSelect,
    };
    console.log(body)
    // if (this.selectedDate == '') {
    //   this.toastService.error('Please select showdate!', 'Error:');
    // } else {
    //   if (this.screenSelect == 0) {
    //     this.toastService.error('Please select screen!', 'Error:');
    //   } else {
    //     if (this.listShowTimeSelect.length == 0) {
    //       this.toastService.error('Please select showtime!', 'Error:');
    //     } else {
    //       const body = {
    //         movieId: parseInt(this.activatedRoute.snapshot.params['id']),
    //         showDate: this.selectedDate,
    //         screenId: this.screenSelect,
    //         showTime: this.listShowTimeSelect,
    //       };
    //       this.movieService.addMovieShowTime(body).subscribe(data => {
    //         this.toastService.success('Create showtime success!', 'Success:');
    //       })
    //     }
    //   }
    // }


  }

  addMinutesToTime(time, minutes) {
    const [hours, mins, secs] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins, secs);
    date.setMinutes(date.getMinutes() + minutes);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }
}
