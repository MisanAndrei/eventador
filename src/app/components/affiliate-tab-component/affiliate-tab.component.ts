import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Section } from 'src/app/Models/Models';

@Component({
  selector: 'app-affiliate-tab',
  templateUrl: './affiliate-tab.component.html',
  styleUrls: ['./affiliate-tab.component.css']
})
export class AffiliateTabComponent {
  @Input() section?: Section;
  isMobile: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver){
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  }
}