import {  ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { Blog } from 'src/app/Models/Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-tab',
  templateUrl: './blogs-tab.component.html',
  styleUrls: ['./blogs-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BlogsTabComponent implements OnInit {
  @Input() blogs?: Blog[];
  
  isMobile: Observable<boolean>;
  constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {   

  }

  onCardClick(blog: Blog){
    const formattedBlogName = this.formatBlogName(blog.title);
    this.router.navigate(['/blog', `${formattedBlogName}-${blog.id}`]);
  }

  formatBlogName(blogName: string): string {
    return blogName.replace(/\s+/g, '-');
  }
}