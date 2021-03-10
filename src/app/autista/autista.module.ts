import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutistaRoutingModule } from './autista-routing.module';
import { AutistaComponent } from './autista.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [AutistaComponent],
  imports: [
    CommonModule,
    AutistaRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AutistaModule { }
