import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ChangePasswordRequest } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  verifyPassword: string = '';
  isMobile: Observable<boolean>;

  incorrectPassword: boolean = false;
  passwordChangedSuccesfully: boolean = false;
  

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private authService: AuthService) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
   }

  changePassword() {
    const userId = this.authService.getLoggedUser().id;

    const changePasswordRequest: ChangePasswordRequest = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        userId: userId
      };
  
      this.apiService.changePassword(changePasswordRequest)
      .subscribe({
        next: (response) => {
          // Handle successful response
          console.log('Password changed successfully:', response);
          this.passwordChangedSuccesfully = true;
          this.oldPassword = '';
          this.newPassword = '';
          this.verifyPassword = '';
        },
        error: (error) => {
          // Handle error
          this.incorrectPassword = true;
          this.oldPassword = '';
          this.newPassword = '';
          this.verifyPassword = '';
          console.error('Error changing password:', error);
        }
      });
  }

  checkPasswords(){
    if (this.oldPassword == '' || this.newPassword !== this.verifyPassword || this.newPassword == '' || this.verifyPassword == ''){
        return true;
    }
    
    return false;
  }

  
}