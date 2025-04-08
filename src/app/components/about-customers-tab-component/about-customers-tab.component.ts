import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Section } from 'src/app/Models/Models';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-about-customers-tab',
  templateUrl: './about-customers-tab.component.html',
  styleUrls: ['./about-customers-tab.component.css']
})
export class AboutCustomersTabComponent implements OnInit {
  isMobile: Observable<boolean>;
  userLoggedIn: boolean = true;
  @Input() section?: Section;
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService){
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  }
  ngOnInit(): void {
    this.userLoggedIn = this.authService.isAuthenticated();
  }
}