import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { AuthService } from 'src/app/Services/AuthService';




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

  categories: Category[] = [];

  

  isLoggedIn(): boolean {
    // Check if the user is logged in by checking if the token is present in local storage
    const token = localStorage.getItem('access_token');

    return token !== null;
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

  menuItems = [
    { link: '/acasa', description: 'Acasa' },
    { link: '/despre-noi', description: 'Despre Noi' },
    { link: '/contact', description: 'Contact' },
    { link: '/dashboard', description: 'Dashboard' },
    { link: '/noutati', description: 'Blog complet' },
    { link: '/autentificare', description: 'Autentifica-te' },
    { link: '/blog', description: 'Blog Simplu' },
    { link: '/furnizori', description: 'Furnizori'},
    { link: '/colaborator', description: 'Colaborator'},
    { link: '/creare-profil', description: 'Creare Profil'}
    // Add more items as needed
  ];



  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

      apiService.getCategories().subscribe(response => {
        this.categories = response;
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

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/acasa']);
  }
  
  
}

