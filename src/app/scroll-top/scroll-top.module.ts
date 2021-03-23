import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ScrollTopComponent } from './scroll-top.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    // ScrollTopComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    // ScrollTopComponent,
  ]
})
export class ScrollTopModule { }
