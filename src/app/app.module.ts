// import { ScrollTopModule } from './scroll-top/scroll-top.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { LogoutComponent } from './logout/logout.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TopNavComponent } from './nav-menu/top-nav/top-nav.component';
import { SideNavComponent } from './nav-menu/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    TopNavComponent,
    SideNavComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatButtonModule,
    HttpClientModule,
    MatTooltipModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    // ScrollTopModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
