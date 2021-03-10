import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutistaComponent } from './autista.component';

const routes: Routes = [{ path: '', component: AutistaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutistaRoutingModule { }
