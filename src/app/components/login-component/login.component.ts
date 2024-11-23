import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isMobile: any;
  username: string = '';
  password: string = '';
  errorCredentials: boolean = false;
  errorNotActivated: boolean = false;
  errorDefault: boolean = false;

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver, private apiService: ApiService, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
   }

   async login() {
    this.errorDefault = false;
    this.errorCredentials = false;
    this.errorNotActivated = false;
    this.authService.login(this.username, this.password).subscribe({
      next: result => {
        if (result) {
          if (result.data){
            this.authService.storeLoggedUser(result.data);
            this.authService.storeFavoriteProfiles(result.data.favourtieProfilesIds ?? []);
            this.router.navigate(['/acasa']);
          }
          else{
            switch (result.statusCode) {
              case 403:
                this.errorNotActivated = true;
                break;
              case 404:
                this.errorCredentials = true;
                break;
              default:
                this.errorDefault = true;
                break;
            }
          }
          
        } else {
          this.errorDefault = true;
        }
      },
      error: error => {
        this.errorDefault = true;
      }
    });
  }
}