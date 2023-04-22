import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ScreenService} from '../../services/ScreenService';
import {JsogService} from 'jsog-typescript';
import {Screen} from '../../shared/model/entity/Screen';
import { Location } from '@angular/common';
declare const chooseSeat: any;


@Component({
  selector: 'app-manage-screen',
  templateUrl: './manage-screen.component.html',
  styleUrls: ['./manage-screen.component.css']
})
export class ManageScreenComponent implements OnInit {
  private id: any;
  screen: Screen;

  constructor(
    private activatedRoute: ActivatedRoute,
    private screenService: ScreenService,
    private jsogService: JsogService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)  => {
      this.id = (paramMap.get('id'));
      console.log(this.id);
      this.screenService.findScreenById(this.id).subscribe(
        (data) => {
          this.screen = this.jsogService.deserializeObject(data);
          console.log(this.screen);
        }
      );
    });
  }

  chooseSeat() {
    chooseSeat();
    console.log('choose Seat');
  }

  back() {
    this.location.back();
  }
}
