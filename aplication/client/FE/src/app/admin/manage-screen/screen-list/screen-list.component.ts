import { Component, OnInit } from '@angular/core';
import {ScreenService} from '../../../services/ScreenService';
import {Screen} from '../../../shared/model/entity/Screen';
import {JsogService} from 'jsog-typescript';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit {
  page: 1;
  keyWord = null;
  screenList: Screen[];
  constructor(
    private screenService: ScreenService,
    private jsogService: JsogService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.screenService.findAll().subscribe(
      (data) => {
        // @ts-ignore
        this.screenList = this.jsogService.deserializeArray(data, Screen);
        console.log(this.screenList);
      }
    );
  }

  searchKeyWord(){
    console.log(this.keyWord);
    this.screenService.searchScreen(this.keyWord).subscribe((data) => {
      console.log(data);
      this.screenList = this.jsogService.deserializeArray(data, Screen) ;
      this.page = 1;
      if (this.screenList.length === 0) {
        this.toastrService.error('Không có phòng chiếu phù hợp!', 'Thông báo');
      }
    });

  }
}
