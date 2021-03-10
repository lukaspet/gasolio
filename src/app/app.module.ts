import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LogoutComponent } from './logout/logout.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
    position: 'right',
    distance: 12
  },
  vertical: {
    position: 'top',
    distance: 12,
    gap: 10
  }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    LogoutComponent,
    HomeComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
