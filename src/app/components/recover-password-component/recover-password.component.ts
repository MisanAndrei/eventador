import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  isMobile: any;
  username: string = '';
  errorWhenLogging: boolean = false;

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver, private apiService: ApiService, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
   }

   async login() {
    this.apiService.recoverPassword(this.username).subscribe(
      result => {
        if (result) {
          // Successful login logic, navigate, etc.
          this.router.navigate(['/acasa']);
        } else {
          // Handle unsuccessful login
          this.errorWhenLogging = true;
        }
      },
      error => {
        // Handle errors, if any
        this.errorWhenLogging = true;
      }
    );
  }
}