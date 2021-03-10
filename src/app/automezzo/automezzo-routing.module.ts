import { EditAutomezzoComponent } from './edit-automezzo/edit-automezzo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomezzoComponent } from './automezzo.component';

const routes: Routes = [
  {
    path: '', component: AutomezzoComponent
  },
  {
    path: 'edit', component: EditAutomezzoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomezzoRoutingModule { }
