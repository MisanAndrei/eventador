import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Category, Group } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { AuthService } from 'src/app/Services/AuthService';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog-component/delete-dialog.component';




@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  //security
  currentUserRole!: UserRole;

  showMenu = false;
  isCollapsed = true;
  isMobile: Observable<boolean>;
  showCategoriesFromLink: boolean = false;
  showCategoriesFromMenu: boolean = false;
  selectedGroup: any = null;

  categoryGroups: Group[] = [];

  

  isLoggedIn(): boolean {
    // Check if the user is logged in by checking if the token is present in local storage
    return this.authService.isAuthenticated();
  }

  isAdminOrMarketingLoggedIn(): boolean {
    if (this.isLoggedIn()){
      if (this.authService.getLoggedUserRole() === UserRole.blogWriter || this.authService.getLoggedUserRole() === UserRole.admin){
        return true;
      }
    }

    return false;
  }

  isPartnerLoggedIn(): boolean {
    if (this.isLoggedIn()){
      if (this.authService.getLoggedUserRole() === UserRole.partner){
        return true;
      }
    }
    return false;
  }



  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private apiService: ApiService, private authService: AuthService, private dialog: MatDialog) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

      apiService.getMainCategories().subscribe(response => {
        this.categoryGroups = response;
      })
  }
  ngOnInit(): void {
    if (this.isLoggedIn()){
      this.currentUserRole = this.authService.getLoggedUserRole();
    }
  }

  

  toggleCollapse() {

    document.getElementsByClassName("menu-container")[0].classList.toggle("menu-change");
    this.showMenu = !this.showMenu;
    document.body.classList.toggle('no-scroll', this.showMenu); // Optional: Prevent scrolling in the background
    this.isCollapsed = !this.isCollapsed;
  }

  onItemClick(link: string) {
    this.toggleCollapse();
    this.router.navigate([link]);
  }

  hideOverlay(){
    this.showCategoriesFromLink = false;
    this.showCategoriesFromMenu = false;
  }

  logOutMobile(){
    
    this.toggleCollapse();
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      data: { text: 'Sunteți sigur că vreți să vă deconectați?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.authService.logOut();
        this.router.navigate(['/acasa']);
      }
    });
    
  }

  logOut(){

    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      data: { text: 'Sunteți sigur că vreți să vă deconectați?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.authService.logOut();
        this.router.navigate(['/acasa']);
      }
    });
  }

  showCategories(group: any): void {
    this.selectedGroup = group;
  }

  hideCategories(): void {
    this.selectedGroup = null;
  }
  
  
}

