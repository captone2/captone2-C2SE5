import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './layout/not-found/not-found.component';


const sharedRoutes: Routes = [

];

@NgModule({
  declarations: [
    NotFoundComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(sharedRoutes),
  ]
})
export class SharedModule {
}
