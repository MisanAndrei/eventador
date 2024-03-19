import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, switchMap } from 'rxjs';
import { ProfileCard } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteProfilesServiceComponent } from 'src/app/Services/FavoriteProfilesService';
import { AuthService } from 'src/app/Services/AuthService';

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
  selectedZone?: number;
  profileCards: ProfileCard[] = [];
  filteredProfileCards: ProfileCard[] = [];
  zoneOfInterestRomania: number = 43;
  zones: any[] = [];
  categories: any[] = [];
  isMobile: Observable<boolean>;
  currrentUserLoggedIn: boolean = true;

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private route: ActivatedRoute, private authService: AuthService, private router: Router, private favoriteProfilesService: FavoriteProfilesServiceComponent) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }
  ngOnDestroy(): void {
    if (!this.arraysHaveSameValues(this.currentUserFavoriteProfiles, this.currentUserOldFavoriteProfiles)){
      this.favoriteProfilesService.updateFavoriteProfiles();
    }
  }

  ngOnInit(): void {
    this.currrentUserLoggedIn = this.authService.isAuthenticated();

    if (this.favoriteProfilesPage){
      this.currentUserFavoriteProfiles = this.favoriteProfilesService.loadFavoriteProfiles();
          this.currentUserOldFavoriteProfiles = this.favoriteProfilesService.loadFavoriteProfiles();
      if (this.currentUserFavoriteProfiles.length > 0){
        this.apiService.getProfileCardsByIds(this.currentUserFavoriteProfiles).subscribe(x => {
          this.profileCards = x;
          this.filteredProfileCards = x;
        })
      }else{
        this.noFavoritesMessageVisible = true;
      }
      
    }else{
      this.authService.checkFavoriteProfilesKey();
      this.apiService.getProfileCards().pipe(
        switchMap(response1 => {
          this.currentUserFavoriteProfiles = this.favoriteProfilesService.loadFavoriteProfiles();
          this.currentUserOldFavoriteProfiles = this.favoriteProfilesService.loadFavoriteProfiles();
          this.profileCards = response1;
          this.filteredProfileCards = response1;
          this.applyFilters();
          return this.apiService.getCategories();
        }),
        switchMap(response2 => {
          this.categories = response2
          return this.apiService.getCounties();
        })
      ).subscribe(response3 => {
        this.zones = response3;
      });
  
      this.selectedCategory = Number(this.route.snapshot.paramMap.get('id')) ?? undefined;
    }


  }

      applyFilters() {
        this.filteredProfileCards = this.profileCards;
        if (this.searchTerm != ''){
          this.filteredProfileCards = this.filteredProfileCards.filter(x => x.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()));
        }
        
        if (this.selectedZone != undefined && this.selectedZone != 0){
          this.filteredProfileCards = this.filteredProfileCards.filter(x => x.areaOfInterest?.map(x => x.id).includes(this.selectedZone ?? 0) || x.areaOfInterest?.map(x => x.id).includes(this.zoneOfInterestRomania));
        }

        if (this.selectedCategory != undefined && this.selectedCategory != 0) {
          this.filteredProfileCards = this.filteredProfileCards.filter(x => x.category.id == this.selectedCategory);
        }

      }

      clearFilters() {
        // Implement your filtering logic here using the searchTerm, selectedCategory, and selectedZone
        this.filteredProfileCards = this.profileCards;
        this.searchTerm = '';
        this.selectedCategory = undefined;
        this.selectedZone = undefined;
      }

      toggleFilter() {
        this.showFilter = !this.showFilter;
      }

      isFavorite(profileId: number): boolean{
        if (this.currentUserFavoriteProfiles.includes(profileId)) {
          return true;
        }

        return false;
      }

      onCardClick(profileId: number){
        this.router.navigate(['/furnizor', profileId]);
      }

      onHeartClick(event: Event, profileId: number){
        event.stopPropagation();
        if (!this.currentUserFavoriteProfiles.includes(profileId)) {
          this.currentUserFavoriteProfiles.push(profileId);
          this.favoriteProfilesService.addProfileToFavorite(profileId);
        }
        else {
          const index = this.currentUserFavoriteProfiles.indexOf(profileId);
          if (index !== -1) {
            this.currentUserFavoriteProfiles.splice(index, 1);
            this.favoriteProfilesService.removeProfileFromFavorite(profileId);
          }

          if (this.favoriteProfilesPage){
            this.filteredProfileCards = this.filteredProfileCards.filter(x => x.id != profileId);

            if (this.filteredProfileCards.length == 0){
              this.noFavoritesMessageVisible = true;
            }
          }
        }
      }

      arraysHaveSameValues(arr1: number[], arr2: number[]): boolean {
        // Convert arrays to strings and compare
        return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
      }
}