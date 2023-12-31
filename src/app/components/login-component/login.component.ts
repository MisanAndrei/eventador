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
  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver, private apiService: ApiService, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
   }

  async login() {
    // Replace with your actual login logic and API call
    // After successful login, you'll receive the token in the response
    console.log('button clicked');
    var loggedIn = this.authService.login(this.username, this.password)

    this.router.navigate(['/acasa']);
    //const token = 'your_access_token'; // Replace with the actual token from the response

    //this.authService.storeToken(token);
  }
}