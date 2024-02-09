import {  ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { Blog } from 'src/app/Models/Models';

@Component({
  selector: 'app-blogs-tab',
  templateUrl: './blogs-tab.component.html',
  styleUrls: ['./blogs-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BlogsTabComponent implements OnInit {
  @Input() blogs?: Blog[];
  
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