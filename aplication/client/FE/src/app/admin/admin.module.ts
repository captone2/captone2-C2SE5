import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { EmployeeListAdminComponent } from './manage-employee/employee-list-admin/employee-list-admin.component';
import { EmployeeAddAdminComponent } from './manage-employee/employee-add-admin/employee-add-admin.component';
import { EmployeeUpdateAdminComponent } from './manage-employee/employee-update-admin/employee-update-admin.component';
import { EmployeeDeleteAdminComponent } from './manage-employee/employee-delete-admin/employee-delete-admin.component';
import { ManageScreenComponent } from './manage-screen/manage-screen.component';
import { ScreenListComponent } from './manage-screen/screen-list/screen-list.component';
import { SeatDetailComponent } from './manage-screen/seat-detail/seat-detail.component';
import { ManageMovieComponent } from './manage-movie/manage-movie.component';
import { MovieListAdminComponent } from './manage-movie/movie-list-admin/movie-list-admin.component';
import { MovieAddAdminComponent } from './manage-movie/movie-add-admin/movie-add-admin.component';
import { MovieUpdateAdminComponent } from './manage-movie/movie-update-admin/movie-update-admin.component';
import { ManagePromotionComponent } from './manage-promotion/manage-promotion.component';
import { PromotionListAdminComponent } from './manage-promotion/promotion-list-admin/promotion-list-admin.component';
import { PromotionAddAdminComponent } from './manage-promotion/promotion-add-admin/promotion-add-admin.component';
import { PromotionUpdateAdminComponent } from './manage-promotion/promotion-update-admin/promotion-update-admin.component';
import { PromotionDeleteAdminComponent } from './manage-promotion/promotion-delete-admin/promotion-delete-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailAdminComponent } from './manage-employee/employee-detail-admin/employee-detail-admin.component';
import { NotifyEmployeeComponent } from './manage-employee/notifyEmployee/notify-employee/notify-employee.component';
import { GuestModule } from '../guest/guest.module';
import { EmployeeModule } from '../employee/employee.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatInputModule } from '@angular/material/input';
import { MovieDetailsAdminComponent } from './manage-movie/movie-details-admin/movie-details-admin.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbAlertModule, NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarLeftComponent } from './navbar-left/navbar-left.component';
import { AuthGuardService } from '../services/AuthGuardService';
import { Role } from '../common/Role';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { OrderModule } from 'ngx-order-pipe';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CssComponent } from './css/css.component';
import { ShowtimeListComponent } from './manage-showtime/showtime-list/showtime-list.component';
import { ShowtimeAddComponent } from './manage-showtime/showtime-add/showtime-add.component';
import { FoodComponent } from './manage-food/food/food.component';
import { Food1Component } from './manage-food/food1/food1.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// import { FoodAddComponent } from './manage-food/food-add/food-add.component';
// import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
const adminRoutes: Routes = [
  // {
  //   path: 'list-movie',
  //   component: MovieListAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data:  { expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'update-movie/:id/:idAccount', // id movie, id account
  //   component: MovieUpdateAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data:  { expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'create-movie/:id',
  //   component: MovieAddAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'show-details-movie/:id',
  //   component: MovieDetailsAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'employee-list',
  //   component: EmployeeListAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'employee-create',
  //   component: EmployeeAddAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'employee-update/:id',
  //   component: EmployeeUpdateAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'employee-detail/:id',
  //   component: EmployeeDetailAdminComponent,
  //   canActivate: [AuthGuardService],
  //   data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },
  // {
  //   path: 'screens',
  //   component: ScreenListComponent,
  //   canActivate: [AuthGuardService],
  //   data: {expectedRole: [Role.Admin, Role.User, Role.Mod]}
  // },


  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: [Role.Admin] },
    children: [
      {
        path: 'home', component: DashboardComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin, Role.Employee] },
      },
      {
        path: 'movie', component: MovieListAdminComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'movie-detail/:id', component: MovieDetailsAdminComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'movie-add', component: MovieAddAdminComponent
        // , canActivate: [AuthGuardService],
        // data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'movie-update/:id', component: MovieUpdateAdminComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'employee', component: EmployeeListAdminComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'employee-add', component: EmployeeAddAdminComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },

      {
        path: 'employee/detail', component: EmployeeDetailAdminComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },

      {
        path: 'employee-update/:id', component: EmployeeUpdateAdminComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'food', component: FoodComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'food1', component: Food1Component
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'screen', component: ScreenListComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'screen-seat', component: SeatDetailComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
      {
        path: 'showtime-add', component: ShowtimeAddComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },

      {
        path: 'showtime', component: ShowtimeListComponent
        , canActivate: [AuthGuardService],
        data: { expectedRole: [Role.Admin] },
      },
    ]
  }
];

@NgModule({
  declarations: [
    ManageEmployeeComponent,
    ManageScreenComponent,
    ScreenListComponent,
    SeatDetailComponent,
    ManageMovieComponent,
    MovieListAdminComponent,
    MovieAddAdminComponent,
    MovieUpdateAdminComponent,
    ManagePromotionComponent,
    MovieDetailsAdminComponent,
    ManageEmployeeComponent,
    EmployeeListAdminComponent,
    EmployeeAddAdminComponent,
    EmployeeUpdateAdminComponent,
    EmployeeDeleteAdminComponent,
    ManageScreenComponent,
    ScreenListComponent,
    SeatDetailComponent,
    ManageMovieComponent,
    MovieListAdminComponent,
    MovieAddAdminComponent,
    MovieUpdateAdminComponent,
    ManagePromotionComponent,
    PromotionListAdminComponent,
    PromotionAddAdminComponent,
    PromotionUpdateAdminComponent,
    PromotionDeleteAdminComponent,
    EmployeeDetailAdminComponent,
    NotifyEmployeeComponent,
    NavbarLeftComponent,
    AdminHomeComponent,
    DashboardComponent,
    CssComponent,
    ShowtimeListComponent,
    ShowtimeAddComponent,
    FoodComponent,
    Food1Component,
    
  ],
  exports: [
    EmployeeListAdminComponent,
    EmployeeAddAdminComponent,
    NavbarLeftComponent,
    EmployeeDetailAdminComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(adminRoutes),
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    GuestModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    MatInputModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AngularFireDatabaseModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbCarouselModule,
    MatCardModule,
    NgxPaginationModule,
    EmployeeModule,
    OrderModule,
    NgxYoutubePlayerModule,
  ]
})
export class AdminModule {
}
