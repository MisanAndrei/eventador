import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isMobile: Observable<boolean>;
  section1: any;
  blogs: any;
  section2: any;
  profileCards: any;
  categories: any;
  section3: any;
  section4: any;

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }
  ngOnInit(): void {
    this.apiService.getLandingPage().subscribe(response => {
      this.section1 = response.sections[0];
      this.section2 = response.sections[1];
      this.section3 = response.sections[2];
      this.section4 = response.sections[3];
      this.profileCards = response.profileCards;

      this.isMobile.subscribe(isMobile => {
        this.blogs = isMobile ? response.blogCards.slice(0, 4) : response.blogCards;
        this.categories = isMobile ? response.categories.slice(0, 4) : response.categories;
      });
    })
  }



}