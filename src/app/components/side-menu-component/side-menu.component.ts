import { Component, Inject, OnInit } from '@angular/core';
import { Category, MenuLinks } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  categories: Category[] = [];
  isCollapsed = true;
  allCategories: Category[] = [];
  allMenuLinks: MenuLinks[] = [ { link: '/despre-noi', description: 'Despre noi'}, { link: '/contact', description: 'Contact'}, { link: '/dashboard', description: 'Dashboard'}, { link: '/autentificare', description: 'Autentifica-te'}, { link: '/noutati', description: 'Blog'}, { link: '/blog', description: 'Blog simplu'}];
  menuLinks: MenuLinks[] = [];
  customersLink: MenuLinks = {link: '/furnizori', description: 'Toti furnizorii'};

  isMobile: Observable<boolean>;
  constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit() {
    this.apiService.getCategories().subscribe(values => {
      this.allCategories = values;
    })
  }

  toggleCollapse() {
    document.getElementsByClassName("menu-container")[0].classList.toggle("menu-change");

    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed){
      this.categories = [];
      this.menuLinks = [];
    }else{
      this.categories = this.allCategories;
      this.menuLinks = this.allMenuLinks;
    }
  }
}