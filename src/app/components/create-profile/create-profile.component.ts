import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category, City, County, CreateUser } from 'src/app/Models/Models';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CreateProfileComponent implements OnInit {
  selectedAreas: number[] = [];
  selectedCategory: number[] = [];
  tooManyImages: boolean = false;
  tooManyImagesMessage: string = 'Prea multe imagini selectate, va rugam alegeti din nou!';
  
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
    businessCUI: string = '';
    category: string = '';
    description: string = '';
    selectedImages: File[] = [];
    selectedProfileImage: File[] = [];
    convertedSelectedImages: string[] = [];
    convertedSelectedProfileImage: string = '';
    maxAllowedFiles: number = 5;

    //just for testing
    cities: City[] = [];
    counties: County[] = [];
    areas: County[] = [];
    categories: Category[] = [];

    // Toggle for Business Account
    isBusinessAccount: boolean = false;
    isLegalPerson: boolean = false;

    isMobile: Observable<boolean>;
      constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches)
          );
      }
  
    ngOnInit(): void {
      this.apiService.getCategories().pipe(
        switchMap(categories => {
          this.categories = categories;
          return this.apiService.getCounties();
        })
      ).subscribe(areas => {
        this.areas = areas;
        this.counties = areas;
      });
  }
  
    // Method to toggle business info visibility
    toggleBusinessInfo() {
      // Reset business info fields when toggled off
      if (!this.isBusinessAccount) {
        this.businessName = '';
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
      const files: File[] = Array.from(event.target.files);

      if (files.length > this.maxAllowedFiles){
        this.tooManyImages = true;
        return ;
      }

      this.tooManyImages = false;

      this.convertedSelectedImages = [];
    
      files.forEach(file => {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          // Extract the base64 data part
          const base64Image = e.target.result as string;
          const base64Data = base64Image.split(',')[1]; // Split at the comma to get the base64 data
          this.convertedSelectedImages.push(base64Data);
        };
    
        // Read the file as a data URL, triggering the `onload` event
        reader.readAsDataURL(file);
      });
    }

    onProfileImageSelected(event: any){
      const file: File = event.target.files[0];

      this.tooManyImages = false;

      this.convertedSelectedProfileImage = '';
    
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          // Extract the base64 data part
          const base64Image = e.target.result as string;
          const base64Data = base64Image.split(',')[1]; // Split at the comma to get the base64 data
          this.convertedSelectedProfileImage = base64Data;
        };
    
        // Read the file as a data URL, triggering the `onload` event
        reader.readAsDataURL(file);
      
    }

    onCountyChange() {
        // Reset the selectedCityId when the county changes
        this.cityId = null; 
        this.apiService.getCities(this.countyId ?? 0).subscribe(x => {
          this.cities = x;
        });
    }

    saveButtonEnabled(){
      if (this.nullOrEmpty(this.email) || this.nullOrEmpty(this.firstName) || this.nullOrEmpty(this.lastName) || this.password != this.passwordVerified || this.password == ''){
        return false;
      }

      if (this.isBusinessAccount && (this.nullOrEmpty(this.businessName) || this.nullOrEmpty(this.description) || this.cityId == null || this.countyId == null || this.selectedAreas.length == 0 || this.convertedSelectedImages.length == 0 || this.convertedSelectedProfileImage == '' || this.phoneNumber == '')){
        return false;
      }

      if (this.isLegalPerson && this.nullOrEmpty(this.businessCUI)){
        return false;
      }

      return true;
      
    }

    nullOrEmpty(value: string){
      if (value == undefined || value == null || value == '')
      return true;

      return false;
    }

    onSaveButtonClick() {
    var user = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      phoneNumber: this.phoneNumber,
      role: this.isBusinessAccount ? UserRole.supplier : UserRole.customer,
      profile: {
        businessName: this.businessName,
        businessCUI: this.businessCUI,
        categoryId: this.selectedCategory,
        motto: this.motto,
        cityId: this.cityId,
        areaOfInterest: this.selectedAreas,
        images: this.convertedSelectedImages,
        profileImage: this.convertedSelectedProfileImage,
        description: this.description,
        websiteUrl: this.websiteUrl,
        facebookUrl: this.facebookUrl,
        youtubeUrl: this.youtubeUrl,
        instagramUrl: this.instagramUrl
      } as unknown
    } as CreateUser

    if (user.role == UserRole.customer){
      user.profile = undefined;
    }

    this.apiService.createUser(user);
    }

    checkPasswordIncorrect(){
      if (this.password != '' && this.passwordVerified != '' && this.password != this.passwordVerified){
        return true;
      }

      return false;
    }
  }

  