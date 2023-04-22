import {Component, OnDestroy, OnInit} from '@angular/core';
import {SeatService} from '../../../services/seat.service';
import {Time} from '@angular/common';
import {SeatDTO} from '../../../shared/model/dto/SeatDTO';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import {BookingDTO} from '../../../shared/model/dto/BookingDTO';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnInit, OnDestroy {
  seats: any[] = [];
  title = '';
  showtime: Time;
  totalPrice = 0;
  public payPalConfig?: IPayPalConfig;
  bookingDTOs: BookingDTO[] = [];
  private subscription: Subscription;

  constructor(private seatService: SeatService, private router: Router) {
    // this.subscription = this.seatService.sharedParam.subscribe(data => {
    //   this.seats = data;
    // });
  }

  ngOnInit(): void {
    console.log(this.showPriceTicket());
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'checkout',
        layout: 'horizontal',
        size: 'small',
        shape: 'rect'
      },
      onApprove: (data, actions) => {
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
          alert('success');
        });
      },
      onClientAuthorization: (data) => {
        // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
        alert('cancel');
      },
      onError: err => {
        // console.log('OnError', err);
        alert('error');
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);
      },
    };
  }

  // TuHC - hien thi gia ve sau khi dat
  showPriceTicket() {
    let total = 0;
    console.log(this.seats);
    for (const seat of this.seats) {
      total = total + seat.basePrice + seat.price;
    }
    return total;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
