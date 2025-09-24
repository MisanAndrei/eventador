import { Dialog } from '@angular/cdk/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../Services/AuthService';
import { DialogComponent } from '../dialogs/dialog-component/dialog.component';
import { ApiService } from '../../Services/ApiService';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog-component/delete-dialog.component';
import { Router } from '@angular/router';
import { UserRole } from '../../Utilities/enums/Enums';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

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
  editUserVisible: boolean = true;
  personalProfiles!: number[];
  personalProfilesVisible: boolean = true;
  signUpLink: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private breakpointObserver: BreakpointObserver, private authService: AuthService, @Inject(MatDialog) private dialog: MatDialog, private apiService: ApiService, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()){
      this.router.navigate(['/acasa']);
    }

    this.getData();
  }

   getData(){
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
      if (isPlatformBrowser(this.platformId)) {
        this.signUpLink = `${window.location.origin}/Inscriere/furnizor/${user.referralCode}`;
      }
    }
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
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
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