import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { TopRateComponent } from './top-rate/top-rate.component';

const staticRoutes: Routes = [
  // {path: 'about-us', component: AboutUsComponent},
];

@NgModule({
  declarations: [
    // AboutUsComponent,
TopRateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(staticRoutes)
  ]
})
export class StaticPageModule { }
