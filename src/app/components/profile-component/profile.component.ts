import { Dialog } from '@angular/cdk/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/Services/AuthService';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { DialogComponent } from '../dialogs/dialog-component/dialog.component';
import { ApiService } from 'src/app/Services/ApiService';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog-component/delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //profile details
  userRole!: UserRole;
  loggedUserId!: number;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  nameInitials: string = '';
  //components details
  isMobile: Observable<boolean>;
  changePasswordVisible: boolean = false;
  deleteAccountVisible: boolean = false;
  addProfileVisible: boolean = false;
  editUserVisible: boolean = false;
  personalProfiles!: number[];
  personalProfilesVisible: boolean = false;
  signUpLink: string = '';

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private dialog: Dialog, private apiService: ApiService, private matDialog: MatDialog, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()){
      this.router.navigate(['/acasa']);
    }

    const user = this.authService.getLoggedUser();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber ?? '';
    this.nameInitials = this.firstName[0].toUpperCase() + this.lastName[0].toUpperCase();
    this.userRole = user.role;
    this.loggedUserId = user.id;
    
    if (this.userRole == UserRole.supplier){
      this.personalProfiles = user.profilesIds ?? [];
    }

    if (this.userRole == UserRole.partner) {
      this.signUpLink = `${window.location.origin}/#/Inscriere/${user.referralCode}`;
    }
  }

  changePassword(){
    this.changePasswordVisible = !this.changePasswordVisible;
    this.deleteAccountVisible = false;
    this.addProfileVisible = false;
    this.editUserVisible = false;
    this.personalProfilesVisible = false;
  }

  addProfile(){
    this.addProfileVisible = !this.addProfileVisible;
    this.deleteAccountVisible = false;
    this.changePasswordVisible = false;
    this.editUserVisible = false;
    this.personalProfilesVisible = false;
  }

  editUser(){
    this.editUserVisible = !this.editUserVisible;
    this.addProfileVisible = false;
    this.deleteAccountVisible = false;
    this.changePasswordVisible = false;
    this.personalProfilesVisible = false;
  }

  viewPersonalProfiles(){
    this.personalProfilesVisible = !this.personalProfilesVisible;
    this.editUserVisible = false;
    this.addProfileVisible = false;
    this.deleteAccountVisible = false;
    this.changePasswordVisible = false;
  }

  

  copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  deleteAccount() {
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.matDialog.open(DeleteDialogComponent, {
      data: { text: 'Sunteți sigur că vreți să ștergeți toate datele contului?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.handleDeleteResponse(result);
    });
  }

  handleDeleteResponse(response: boolean) {
    if (response) {
      this.apiService.deleteUser(this.loggedUserId)
      .subscribe({
        next: (response) => {
          // Handle successful response
          this.authService.logOut();
          this.openSuccessDialog();
          this.router.navigate(['/acasa']);
        },
        error: (error) => {
          // Handle error
          this.openFailureDialog();
        }
      });
    }
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'Contul a fost șters cu succes!',
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