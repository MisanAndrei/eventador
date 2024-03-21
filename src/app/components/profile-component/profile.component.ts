import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/Services/AuthService';
import { UserRole } from 'src/app/Utilities/enums/Enums';

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

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {
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
  }

  changePassword(){
    this.changePasswordVisible = !this.changePasswordVisible;
    this.deleteAccountVisible = false;
    this.addProfileVisible = false;
    this.editUserVisible = false;
    this.personalProfilesVisible = false;
  }

  deleteAccount() {
    this.deleteAccountVisible = !this.deleteAccountVisible;
    this.addProfileVisible = false;
    this.changePasswordVisible = false;
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

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      // User confirmed deletion
      console.log("User confirmed deletion");
    } else {
      // User canceled deletion
      this.deleteAccountVisible = false;
      console.log("User canceled deletion");
    }
  }
}