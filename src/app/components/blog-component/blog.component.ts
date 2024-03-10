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

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
  this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
}
  ngOnInit(): void {   
    this.selectedBlog = Number(this.route.snapshot.paramMap.get('id')) ?? undefined;

    if (this.selectedBlog == undefined){
      this.router.navigate(['/noutati']);
    }

    this.apiService.getBlogById(this.selectedBlog).subscribe(response => {
      this.pdfSrc = response.content ?? "";
    });
  }

  
}