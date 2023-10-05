import {  Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-presentation-tab',
  templateUrl: './presentation-tab.component.html',
  styleUrls: ['./presentation-tab.component.css']
})
export class PresentationTabComponent implements OnInit {
  isMobile: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {   
  }
}