import {  Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-contact-tab',
  templateUrl: './contact-tab.component.html',
  styleUrls: ['./contact-tab.component.css']
})
export class ContactTabComponent implements OnInit {
  isMobile: Observable<boolean>;
  constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {   
  }
}