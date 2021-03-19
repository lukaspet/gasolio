import { SidenavService } from './../../common/services/sidenav.service';
import { Component, OnInit, Inject } from '@angular/core';
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
  ngOnInit(): void {
  }

}
