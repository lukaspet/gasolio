import { HomeComponent } from './home/home.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '', redirectTo: '/home', pathMatch: 'full',
        // component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent, pathMatch: 'full'
      },
      { path: 'automezzo', loadChildren: () => import('./automezzo/automezzo.module').then(m => m.AutomezzoModule) },
      { path: 'autista', loadChildren: () => import('./autista/autista.module').then(m => m.AutistaModule) },
    ]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  {
    path: '', redirectTo: '/home', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
