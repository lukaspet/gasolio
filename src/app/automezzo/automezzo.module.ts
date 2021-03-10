import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomezzoRoutingModule } from './automezzo-routing.module';
import { AutomezzoComponent } from './automezzo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditAutomezzoComponent } from './edit-automezzo/edit-automezzo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [AutomezzoComponent, EditAutomezzoComponent],
  imports: [
    CommonModule,
    AutomezzoRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
  ]
})
export class AutomezzoModule { }
