
import {MovieComponent} from './movie/movie.component';
import {MovieListComponent} from './movie/movie-list/movie-list.component';
import {MovieSearchComponent} from './movie/movie-search/movie-search.component';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {NotificationRegisterComponent} from './register/notification-register/notification-register.component';
import {ShowtimeListComponent} from './showtime-list/showtime-list.component';
import {PriceListComponent} from './price-list/price-list.component';
import {PromotionComponent} from './promotion/promotion.component';
import {PromotionListComponent} from './promotion/promotion-list/promotion-list.component';
import {PromotionDetailComponent} from './promotion/promotion-detail/promotion-detail.component';
import { BookingComponent } from './movie/booking/booking.component';
import {AuthGuardService} from '../services/AuthGuardService';
import {Role} from '../common/Role';
import { TransactionComponent } from './movie/transaction/transaction.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { BookingNoExistComponent } from './movie/booking-no-exist/booking-no-exist.component';
import { SharedModule } from "../shared/shared.module";
import { TopRateComponent } from './movie/top-rate/top-rate.component';
import { ShowTimeComponent } from './movie/show-time/show-time.component';
import { CommingSoonComponent } from './movie/comming-soon/comming-soon.component';
import { NowPlayingComponent } from './movie/now-playing/now-playing.component';
import { ProfileUserComponent } from './movie/profile-user/profile-user.component';
const guestRoutes: Routes = [

  {path: 'cinema', component: MovieListComponent},
  {path: 'show-time', component: ShowTimeComponent},
  {path: 'top-rate', component: TopRateComponent},
  {path: 'comming-soon', component: CommingSoonComponent},
  {path: 'now-playing', component: NowPlayingComponent},
  {path: 'movie-detail/:id', component: MovieDetailComponent},
  {path: 'profile', component: ProfileUserComponent,
  canActivate: [AuthGuardService],
  data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
},
  {path: 'booking/:movieShowTimeId/:transactionId', component: BookingComponent, 
  canActivate: [AuthGuardService],
  data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
},
  {path: 'transaction' , component: TransactionComponent,
  canActivate: [AuthGuardService],
  data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
},
  {path: 'register' , component: RegisterComponent},
  {path: 'booking-not-exist' , component: BookingNoExistComponent},
  {path: 'price', component: PriceListComponent},
  {path: 'showtime-list', component: ShowtimeListComponent},
];
@NgModule({
    declarations: [
        RegisterComponent,
        PriceListComponent,
        PromotionComponent,
        PromotionListComponent,
        PromotionDetailComponent,
        ShowtimeListComponent,
        MovieComponent,
        MovieListComponent,
        MovieSearchComponent,
        MovieDetailComponent,
        NotificationRegisterComponent,
        BookingComponent,
        TransactionComponent,
        BookingNoExistComponent,
        TopRateComponent,
        ShowTimeComponent,
        CommingSoonComponent,
        NowPlayingComponent,
        ProfileUserComponent
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule.forChild(guestRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        CarouselModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        NgxPayPalModule,
        SharedModule
    ]
})
export class GuestModule {
}
