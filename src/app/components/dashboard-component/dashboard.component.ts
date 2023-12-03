import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/ApiService';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private apiService: ApiService){

  }
  ngOnInit(): void {
    this.apiService.getLandingPage().subscribe(response => {
      this.section1 = response.sections[0];
      this.section2 = response.sections[1];
      this.section3 = response.sections[2];
      this.section4 = response.sections[3];
      this.blogs = response.blogCards;
      this.profileCards = response.profileCards;
      this.categories = response.categories;
    })
  }


  section1: any;
  blogs: any;
  section2: any;
  profileCards: any;
  categories: any;
  section3: any;
  section4: any;
}