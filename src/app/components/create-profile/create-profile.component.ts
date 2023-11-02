import { Component } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Category, City, County } from 'src/app/Models/Models';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { MatChipsModule } from '@angular/material/chips';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent {
  selectedAreas: number[] = [];
  selectedCategories: number[] = [];
  
  // Common User Information
    id = 0;
    
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phoneNumber: string = '';
    role: number = UserRole.supplier;
    password: string = '';
    passwordVerified: string = '';
  
    // Business Specific Information
    profileId: number = 0;
    cityId: number | null = null;
    countyId: number | null = null;
    motto: string = '';
    websiteUrl: string = '';
    facebookUrl: string = '';
    instagramUrl: string = '';
    youtubeUrl: string = '';
    businessName: string = '';
    businessEmail: string = '';
    businessPhoneNumber: string = '';
    businessCUI: string = '';
    category: string = '';
    description: string = '';
    selectedImages: File[] = [];

    //just for testing
    cities: City[] = [{id: 1, name: 'Cluj-Napoca'}, {id: 2, name: 'Bucuresti'}];
    counties: County[] = [{id: 1, name: 'Cluj'}, {id: 2, name: 'Brasov'}];
    areas: County[] = [{id: 1, name: 'Cluj'}, {id: 2, name: 'Brasov'}];
    categories: Category[] = [{id: 1, name: 'M.C'}, {id: 2, name: 'DJ'}, {id: 3, name: 'Florarie'}]
  
    // Toggle for Business Account
    isBusinessAccount: boolean = false;
    isLegalPerson: boolean = false;

    isMobile: Observable<boolean>;
      constructor(private breakpointObserver: BreakpointObserver) {
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches)
          );
      }
  
    // Method to toggle business info visibility
    toggleBusinessInfo() {
      // Reset business info fields when toggled off
      if (!this.isBusinessAccount) {
        this.businessName = '';
        this.businessEmail = '';
        this.category = '';
        this.description = '';
        this.motto = '';
        this.websiteUrl = '';
        this.facebookUrl = '';
        this.instagramUrl = '';
        this.youtubeUrl = '';
      }
    }

    toggleLegalPerson(){
      if(!this.isLegalPerson){
        this.businessCUI = '';
      }
    }

    onImagesSelected(event: any) {
        this.selectedImages = Array.from(event.target.files);
        // Process the selected images here, e.g., upload them or display previews.
      }

    onCountyChange() {
        // Reset the selectedCityId when the county changes
        this.cityId = null; 
    }

    onSaveButtonClick() {
    // Implement the logic to save the profile data and images here
    // This method will be triggered when the "Save" button is clicked.
    // You can access all the form field values and selected images from the component properties.
    }
  }