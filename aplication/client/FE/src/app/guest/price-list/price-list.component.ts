import { Component, OnInit } from '@angular/core';
import {Price} from '../../shared/model/entity/Price';
import {ListPriceService} from '../../services/list-price.service';
import {HttpErrorResponse} from '@angular/common/http';
import {JsogService} from "jsog-typescript";

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  listPrice: Price[];

  constructor(private priceService: ListPriceService,
              private jsogService: JsogService) { }

  ngOnInit(): void {
    this.getListPrice();
  }
  getListPrice() {
    this.priceService.getPrice().subscribe(
      (data: any) => {
        // @ts-ignore
        this.listPrice = this.jsogService.deserializeArray(data, Price);
        console.log(data[0].time.split('h', 1)[0]);
        console.log(this.listPrice);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}
