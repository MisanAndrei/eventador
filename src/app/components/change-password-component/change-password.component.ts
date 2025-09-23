import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { ChangePasswordRequest } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { DialogComponent } from '../dialogs/dialog-component/dialog.component';

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
  

  constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver, private apiService: ApiService, private authService: AuthService, @Inject(MatDialog) private dialog: MatDialog) {
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
          this.openSuccessDialog();
          this.oldPassword = '';
          this.newPassword = '';
          this.verifyPassword = '';
        },
        error: (error) => {
          // Handle error
          this.openFailureDialog();
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

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'Parola a fost schimbată cu succes!',
        isSuccess: true
      }
    });
  }

  openFailureDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'A apărut o eroare. Vă rugăm să încercați din nou.',
        isSuccess: false
      }
    });
  }

  
}