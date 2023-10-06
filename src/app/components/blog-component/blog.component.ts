import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {  Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  isMobile: Observable<boolean>;
  blog: any = {id : 1, title: 'Nunta de vis', image: 'https://eventador.ro/uploads/2019/05/0b8be5c58e45e0a5ebe76150a98a7a4d.png', content: 'Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need. Your blog text goes here. Write as much content as you need.'}
  constructor(private breakpointObserver: BreakpointObserver) {
  this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
}
  ngOnInit(): void {   
  }
}