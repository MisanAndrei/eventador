import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable, first, map } from 'rxjs';
import { EditUserRequest } from 'src/app/Models/Models'; // Make sure to import the appropriate model
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { DialogComponent } from '../dialogs/dialog-component/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.css']
})
export class EditPersonalDataComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  isMobile: Observable<boolean>;

  incorrectData: boolean = false;
  dataChangedSuccessfully: boolean = false;
  

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private authService: AuthService, @Inject(MatDialog) private dialog: MatDialog) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
   }
    ngOnInit(): void {
        const user = this.authService.getLoggedUser();
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phoneNumber = user.phoneNumber ?? '';
    }

  editPersonalData() {
    const userId = this.authService.getLoggedUser().id;

    const editPersonalDataRequest: EditUserRequest = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        userId: userId
      };
  
      this.apiService.editPersonalData(editPersonalDataRequest)
      .subscribe({
        next: (response) => {
          // Handle successful response
          console.log('Personal data changed successfully:', response);
          this.authService.updateLoggedUser(this.firstName, this.lastName, this.phoneNumber)
          this.dataChangedSuccessfully = true;
          this.openSuccessDialog();
        },
        error: (error) => {
          // Handle error
          this.incorrectData = true;
          this.firstName = '';
          this.lastName = '';
          this.phoneNumber = '';
          this.openFailureDialog();
          console.error('Error changing personal data:', error);
        }
      });
  }

  checkData(){
    if (this.firstName == '' || this.lastName == ''){
        return true;
    }
    
    return false;
  } 

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'Datele personale au fost schimbate cu succes!',
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