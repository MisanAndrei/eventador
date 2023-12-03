import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Section } from 'src/app/Models/Models';

@Component({
  selector: 'app-about-customers-tab',
  templateUrl: './about-customers-tab.component.html',
  styleUrls: ['./about-customers-tab.component.css']
})
export class AboutCustomersTabComponent {
  isMobile: Observable<boolean>;
  @Input() section?: Section;
  constructor(private breakpointObserver: BreakpointObserver){
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  }
}