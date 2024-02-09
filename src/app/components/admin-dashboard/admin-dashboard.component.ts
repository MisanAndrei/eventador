import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Utilities/enums/Enums';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    public currentUserRole!: UserRole;
    
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
   
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

      if (!this.authService.isUserLogged()){
        this.router.navigate(['/acasa']);
      }else{
        this.currentUserRole = this.authService.getLoggedUserRole();
        if (this.currentUserRole != UserRole.admin && this.currentUserRole != UserRole.blogWriter){
          this.router.navigate(['/acasa']);
        }
      }
  }

  ngAfterViewInit(): void {
    
  }

  

  
  
 
  }

  
