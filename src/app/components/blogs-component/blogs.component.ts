import {  Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';
import { Blog, MainBlog } from 'src/app/Models/Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  isMobile: Observable<boolean>;
  allBlogs?: Blog[];
  blogs?: MainBlog[];
  
  constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver, private ApiService: ApiService, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {
    
    this.ApiService.getBlogs().subscribe(response => {
      this.blogs = response.map((blog: Blog) => {
        return {
          id: blog.id,
          title: blog.title,
          itemsPerRow: 0,
          content: blog.description,
          image: blog.imageUrl,
        };

        
      });
      for (let i = 0; i < this.blogs.length; i++) {
        if (i % 6 === 0) {
          this.blogs[i].itemsPerRow = 1;
        } else if (i % 6 === 1 || i % 6 === 2 || i % 6 === 3) {
          this.blogs[i].itemsPerRow = 3;
        } else {
          this.blogs[i].itemsPerRow = 2;
        }
    }
    })
      
  }

  onCardClick(blog: MainBlog){
    const formattedBlogName = this.formatBlogName(blog.title);
    this.router.navigate(['/blog', `${formattedBlogName}-${blog.id}`]);
  }

  formatBlogName(blogName: string): string {
    return blogName.replace(/\s+/g, '-');
  }
}