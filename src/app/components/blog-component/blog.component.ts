import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Blog } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  isMobile: Observable<boolean>;
  selectedBlog!: number;
  pdfSrc: string = '';
  selectedBlogName: string = '';

  content!: string;

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
  this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
}
  ngOnInit(): void {   
    this.route.params.subscribe(params => {
      const blogInfo = params['id'];
      const lastDashIndex = blogInfo.lastIndexOf('-');
      this.selectedBlogName = blogInfo.substring(0, lastDashIndex).replace(/-/g, ' ');
      this.selectedBlog = blogInfo.substring(lastDashIndex + 1);
    });


    if (this.selectedBlog == undefined){
      this.router.navigate(['/noutati']);
    }

    this.apiService.getBlogById(this.selectedBlog).subscribe(response => {
      this.pdfSrc = response.content ?? "";
      this.content = response.content ?? "";
    });
  }

  
}