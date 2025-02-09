import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, switchMap } from 'rxjs/operators';
import { Group, ProfileCard } from '../../Models/Models';
import { ApiService } from '../../Services/ApiService';
import { FavoriteProfilesServiceComponent } from '../../Services/FavoriteProfilesService';
import { AuthService } from '../../Services/AuthService';
import { CustomersRequest } from '../../Requests/Requests';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {
  @Input() favoriteProfilesPage?: boolean;
  noFavoritesMessageVisible: boolean = false;
  currentUserFavoriteProfiles: number[] = [];
  currentUserOldFavoriteProfiles: number[] = [];
  showFilter: boolean = true;
  searchTerm: string = '';
  selectedCategory?: number;
  selectedCategories?: number[] = [];
  selectedZone?: number;
  profileCards: ProfileCard[] = [];
  filteredProfileCards: ProfileCard[] = [];
  zoneOfInterestRomania: number = 43;
  zones: any[] = [];
  categories: any[] = [];
  isMobile: Observable<boolean>;
  currrentUserLoggedIn: boolean = true;
  categoryGroups?: Group[];
  selectedCategoryGroup?: number;
  stopGettingProfiles: boolean = false;;

  page: number = 1;
  size: number = 21;
  loading: boolean = false;

  type?: string;
  urlId?: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private favoriteProfilesService: FavoriteProfilesServiceComponent,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));

      this.route.params.subscribe((params: Params) => {
        this.type = params['description'];
        this.urlId = +params['id'];
  
        if (this.type && this.urlId) {
          if (this.type === 'Categorie') {
            this.onCategoryGroupRefreshValue(this.urlId);
          } else if (this.type === 'Serviciu') {
            this.setServiceCategory(this.urlId);
          }
        }
      });
  }

  ngOnInit(): void {
    this.currrentUserLoggedIn = this.authService.isAuthenticated();
    if (this.currrentUserLoggedIn){
      this.currentUserFavoriteProfiles = this.favoriteProfilesService.loadFavoriteProfiles();
    this.currentUserOldFavoriteProfiles = this.favoriteProfilesService.loadFavoriteProfiles();
    }else{
      this.authService.checkFavoriteProfilesKey();
      this.currentUserFavoriteProfiles = this.favoriteProfilesService.loadFavoriteProfiles();
    }
    
    if (!this.favoriteProfilesPage) {
      this.loadInitialData();
    } else {
      this.stopGettingProfiles = true;
        
    if (this.currentUserFavoriteProfiles.length > 0){
      this.apiService.getProfileCardsByIds(this.currentUserFavoriteProfiles).subscribe(x => {
        this.profileCards = x;
        this.filteredProfileCards = x;
      })
    }else{
      this.noFavoritesMessageVisible = true;
    }
  }
}

  ngOnDestroy(): void {
    if (!this.arraysHaveSameValues(this.currentUserFavoriteProfiles, this.currentUserOldFavoriteProfiles)) {
      this.favoriteProfilesService.updateFavoriteProfiles();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const buffer = 100; // Adjust this value as necessary
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight; // Use scrollHeight instead of offsetHeight

    if (scrollPosition >= pageHeight - buffer && !this.loading) {
      this.page++;
      this.loadProfileCards();
    }
  }

  getRequestObject(): CustomersRequest {
    return {
      page: this.page,
      size: this.size,
      name: this.searchTerm,
      categoryIds: this.selectedCategories,
      areaOfInterest: this.selectedZone
    };
  }

  loadProfileCards(): void {
    if (this.loading || this.stopGettingProfiles) {
      return; // Prevent multiple calls if already loading
    }
    this.loading = true;
    const request = this.getRequestObject();
    this.apiService.getProfileCards(request).subscribe({
      next: (cards) => {
        if (cards.length == 0){
          this.stopGettingProfiles = true;
        }
        this.profileCards = this.profileCards.concat(cards || []);
        this.filteredProfileCards = this.profileCards;
        this.loading = false;

        requestAnimationFrame(() => {
          this.loading = false;

        });
      },
      error: (error) => {
        console.error('Error loading profile cards:', error);
        this.loading = false;
      }
    });
  }

  loadInitialData(): void {
    this.loading = true;
    this.apiService.getCategories().pipe(
      switchMap(categories => {
        this.categories = categories;
        return this.apiService.getMainCategories();
      }),
      switchMap(mainCategories => {
        this.categoryGroups = mainCategories;
        return this.apiService.getCounties();
      }),
      switchMap(counties => {
        let lastItem = counties.pop();
        if (lastItem) {
          counties.unshift(lastItem);
        }
        this.zones = counties;

        this.route.params.subscribe((params: Params) => {
          this.type = params['description'];
          this.urlId = +params['id'];
    
          if (this.type && this.urlId) {
            if (this.type === 'Categorie') {
              this.onCategoryGroupRefreshValue(this.urlId);
            } else if (this.type === 'Serviciu') {
              this.setServiceCategory(this.urlId);
            }
          }
        });

        return this.apiService.getProfileCards(this.getRequestObject());
      })
    ).subscribe({
      next: (cards) => {
        this.profileCards = cards || [];
        this.filteredProfileCards = cards || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
        this.loading = false;
      }
    });
  }
  
  applyFilters(): void {
    this.page = 1;
    this.profileCards = [];
    this.stopGettingProfiles = false;
    this.loadProfileCards();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = undefined;
    this.selectedZone = undefined;
    this.selectedCategories = [];
    this.selectedCategoryGroup = undefined;
    this.stopGettingProfiles = false;
    this.page = 1;
    this.profileCards = [];
    this.applyFilters();
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  isFavorite(profileId: number): boolean {
    return this.currentUserFavoriteProfiles.includes(profileId);
  }

  onCardClick(profile: ProfileCard): void {
    const formattedProfileName = this.formatProfileName(profile.name);
    this.router.navigate([`/furnizor`, `${formattedProfileName}-${profile.id}`]);
  }  

  onHeartClick(event: Event, profileId: number): void {
    event.stopPropagation();
    if (!this.currentUserFavoriteProfiles.includes(profileId)) {
      this.currentUserFavoriteProfiles.push(profileId);
      this.favoriteProfilesService.addProfileToFavorite(profileId);
    } else {
      const index = this.currentUserFavoriteProfiles.indexOf(profileId);
      if (index !== -1) {
        this.currentUserFavoriteProfiles.splice(index, 1);
        this.favoriteProfilesService.removeProfileFromFavorite(profileId);
      }
      if (this.favoriteProfilesPage) {
        this.filteredProfileCards = this.filteredProfileCards.filter(x => x.id != profileId);
        if (this.filteredProfileCards.length === 0) {
          this.noFavoritesMessageVisible = true;
        }
      }
    }
  }

  arraysHaveSameValues(arr1: number[], arr2: number[]): boolean {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }

  formatProfileName(profileName: string): string {
    return profileName.replace(/\s+/g, '-');
  }

  onCategoryGroupChange(event: any): void {
    const selectedCategoryGroupId = event.value;
    this.selectedCategories = [];
    this.onCategoryGroupRefreshValue(selectedCategoryGroupId);
  }

  onCategoryGroupRefreshValue(selectedCategoryGroupId: any): void {
    const selectedCategoryGroup = this.categoryGroups?.find(group => group.id === selectedCategoryGroupId);
    if (selectedCategoryGroup) {
      this.selectedCategoryGroup = selectedCategoryGroup.id;
      const categoryIds = selectedCategoryGroup.categories.map(category => category.id);
      if (categoryIds && categoryIds.length > 0) {
        this.selectedCategories = categoryIds;
      }
    }
  }

  addUniqueCategories(categoryIds: number[]): void {
    categoryIds.forEach(id => {
      if (!this.selectedCategories?.includes(id)) {
        this.selectedCategories?.push(id);
      }
    });
  }

  

  private setServiceCategory(serviceCategoryId: number): void {
    this.selectedCategories?.push(serviceCategoryId);
  }
}