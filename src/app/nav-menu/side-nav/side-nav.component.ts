import { Page } from './../../models/page';
import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from './../../animations';
import { SidenavService } from './../../common/services/sidenav.service';
import { PageService } from 'src/app/common/services/page.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SideNavComponent implements OnInit {

  public sideNavState = false;
  public linkText = false;
  pages: Page[];

  constructor(private sidenavService: SidenavService, private pageService: PageService) {}

  ngOnInit(): void {
    this.getPages();
  }
  getPages(): void {
    this.pageService.getPages()
    .subscribe(pages => this.pages = pages);
  }
  onSinenavToggle(): void {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }
}
