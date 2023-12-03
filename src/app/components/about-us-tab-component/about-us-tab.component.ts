import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Section } from 'src/app/Models/Models';

@Component({
  selector: 'app-about-us-tab',
  templateUrl: './about-us-tab.component.html',
  styleUrls: ['./about-us-tab.component.css']
})
export class AboutUsTabComponent {
  @Input() section?: Section;
  isMobile: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver){
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  }
}