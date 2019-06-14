import { Component, ChangeDetectionStrategy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

import { filter, tap, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'max-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  routeLoading$: any;
  hideFooter: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private router: Router
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.routeLoading$ = this.router.events.pipe(
        filter(event => event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationCancel),
        tap(event => event instanceof NavigationEnd),
        map(event => event instanceof NavigationStart),
        distinctUntilChanged()
      );
    }
  }
}
