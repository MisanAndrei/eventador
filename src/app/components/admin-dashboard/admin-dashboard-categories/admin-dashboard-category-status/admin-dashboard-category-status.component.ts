// admin-dashboard-category-status.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-category-status',
  templateUrl: './admin-dashboard-category-status.component.html',
  styleUrls: ['./admin-dashboard-category-status.component.css'],
})
export class AdminDashboardCategoryStatusComponent implements OnInit {
  @Input() categories: Category[] = [];

  constructor(private apiService: ApiService){

  }
  ngOnInit(): void {
    // No need to initialize category check state as we'll directly use showOnLandingPage
  }

  toggleCategorySelection(category: Category): void {
    // Toggle the showOnLandingPage state for the category
    category.showOnLandingPage = !category.showOnLandingPage;
  }

  submitCategoryChanges(): void {
    // Handle the list of updated categories as needed
    console.log('Updated Categories:', this.categories);

    var request = this.categories.filter(x => x.showOnLandingPage == true).map(x => x.id).filter(id => id !== undefined) as number[];
    this.apiService.markCategoriesOnLandingPage(request);

    // Add your submission logic here
  }

  canSubmitChanges(): boolean {
    // Check if exactly 8 categories are selected
    const selectedCategories = this.categories.filter((category) => category.showOnLandingPage);
    return selectedCategories.length === 8;
  }
}