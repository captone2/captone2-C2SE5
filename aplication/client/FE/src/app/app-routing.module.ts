
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginnComponent} from './loginn/loginn.component';
import {HomeComponent} from './home/home.component';
import { NotFoundComponent } from './shared/layout/not-found/not-found.component';



const routes: Routes = [
  { path: 'login', component: LoginnComponent},
  { path: 'home', component: HomeComponent},
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
