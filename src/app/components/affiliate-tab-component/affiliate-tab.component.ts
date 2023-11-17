import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-affiliate-tab',
  templateUrl: './affiliate-tab.component.html',
  styleUrls: ['./affiliate-tab.component.css']
})
export class AffiliateTabComponent {
  isMobile: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver){
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  }
}