import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FavoriteProfilesServiceComponent } from '../../Services/FavoriteProfilesService';
import { ToastService } from '../../Services/ToastService';
import { ApiService } from '../../Services/ApiService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isMobile: Observable<boolean>;
  section1: any;
  blogs: any;
  section2: any;
  profileCards: any;
  popularProfileCards: any;
  categories: any;
  section3: any;
  section4: any;
  section5!: any;
  loading = true;

  private storageKey = 'landingPageData';
  private storageExpiryKey = 'landingPageExpiry';

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private favoriteProfilesService: FavoriteProfilesServiceComponent, private toastService: ToastService) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {
    if (this.isDataValid()) {
      // Load data from local storage
      const cachedData = JSON.parse(localStorage.getItem(this.storageKey)!);
      this.assignData(cachedData);
      this.loading = false;
    } else {
      // Fetch from API and store in local storage
      this.apiService.getLandingPage().subscribe({
        next: (response) => {
          this.assignData(response);
          this.saveDataToStorage(response);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  private isDataValid(): boolean {
    const expiry = localStorage.getItem(this.storageExpiryKey);
    if (!expiry) return false;

    const expiryDate = new Date(expiry);
    return expiryDate > new Date(); // Returns true if data is still valid
  }

  private saveDataToStorage(data: any): void {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    localStorage.setItem(this.storageKey, JSON.stringify(data));
    localStorage.setItem(this.storageExpiryKey, expiryDate.toISOString());
  }

  private assignData(data: any): void {
    this.section1 = data.sections[0];
    this.section2 = data.sections[1];
    this.section3 = data.sections[2];
    this.section4 = data.sections[3];
    this.section5 = data.sections[4];

    this.profileCards = data.profileCards.map((card: any) => ({
      ...card, 
      image: encodeURI(card.profileImage)
    }));

    this.popularProfileCards = data.popularProfileCards.map((card: any) => ({
      ...card, 
      image: encodeURI(card.profileImage)
    }));

    this.categories = data.categoryGroups.map((card: any) => ({
      ...card, 
      image: encodeURI(card.image ?? "")
    }));
  }
}
