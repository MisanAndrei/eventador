import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, switchMap } from 'rxjs';
import { ProfileCard } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
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

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private route: ActivatedRoute) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {
    this.apiService.getProfileCards().pipe(
      switchMap(response1 => {
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
}