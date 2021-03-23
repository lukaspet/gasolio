import { SidenavService } from './../../common/services/sidenav.service';
import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from './../../animations';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations: [ onMainContentChange ]
})
export class AppLayoutComponent implements OnInit {
  public onSideNavChange: boolean;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideNavState$.subscribe( res => {
      this.onSideNavChange = res;
    });
   }
   scrollToTop(content: any): void {
    const div = content;
    (function smoothscroll(): void {
    const currentScroll = div.scrollTop || document.body.scrollTop;

    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      div.scrollTo(0, currentScroll - (currentScroll / 8));
    }
   })();
  }

  ngOnInit(): void {
  }

}
