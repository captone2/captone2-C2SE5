import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {ToastrModule} from 'ngx-toastr';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {JsogService} from 'jsog-typescript';
import {CommonModule} from '@angular/common';
import {AdminModule} from './admin/admin.module';
import {GuestModule} from './guest/guest.module';
import {EmployeeModule} from './employee/employee.module';
import {SharedModule} from './shared/shared.module';
import {StaticPageModule} from './static-page/static-page.module';
import {UserModule} from './user/user.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginnComponent} from './loginn/loginn.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    AppComponent,
    LoginnComponent,
    HomeComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => sessionStorage.getItem('toke')
      }
    }),
    UserModule,
    SharedModule,
    GuestModule,
    EmployeeModule,
    AdminModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    StaticPageModule,
    NgbModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 2000,
      extendedTimeOut: 1000
    }),
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => sessionStorage.getItem('toke')
      }
    }),
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, // auth
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    AppRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
   
  ],
  providers: [authInterceptorProviders,
    JsogService
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
