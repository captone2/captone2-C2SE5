import { Component, OnInit } from '@angular/core';
import {ShowTimeDTO} from '../../shared/model/dto/ShowTimeDTO';
import {ShowTimeService} from '../../services/show-time.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-showtime-list',
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.css']
})
export class ShowtimeListComponent implements OnInit {
  showTimeList: ShowTimeDTO[];
  page = 0;
  totalPage: number;
  name = '';
  constructor(private  showTimeService: ShowTimeService, private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.getShowTimeList(this.page);
  }
  getShowTimeList(page) {
    this.showTimeService.getListSHowTime(page).subscribe(
      (data: any) => {
        this.showTimeList = data.content;
        this.totalPage = data.totalPages;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
  lastPage() {
    this.page = this.totalPage - 1;
    this.ngOnInit();
  }
  firstPage() {
    this.page = 0;
    this.ngOnInit();
  }
  nextPage() {
    this.page += 1;
    this.ngOnInit();
  }
  previousPage() {
    this.page -= 1;
    this.ngOnInit();
  }
  changePage(page: number) {
    this.page = page;
    this.ngOnInit();
  }
  selectPage(selectPage: number) {
    if (selectPage <= this.totalPage) {
      this.page = selectPage - 1;
      this.ngOnInit();
    }
  }
  paginate(page: number) {
    if (page >= 0 && page < this.totalPage) {
      this.page = page;
      this.ngOnInit();
    }
  }
  getSearchByName() {
    // tslint:disable-next-line:triple-equals
    if (this.name == '') {
      this.showTimeService.getListSHowTime(this.page).subscribe((data: any) => {
          if (data == null) {
            this.router.navigateByUrl('/admin/film/list').then(
              r => this.toastrService.error(
                'Không tìm thấy dữ liệu',
                'Thông báo',
                {timeOut: 3000, extendedTimeOut: 1500})
            );
          } else {

            this.showTimeList = data.content;
            this.totalPage = data.totalPages;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    } else {
      this.showTimeService.searchByName(this.name, this.page).subscribe((data: any) => {
          if (data == null) {
            this.toastrService.error(
                'Không tìm thấy dữ liệu',
                'Thông báo',
                {timeOut: 3000, extendedTimeOut: 1500});
            this.showTimeList = data;
          } else {
            this.showTimeList = data.content;
            this.totalPage = data.totalPages;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    }
  }
}
