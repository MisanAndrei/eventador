import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { Category, City, County, CreateProfile, CreateUser } from 'src/app/Models/Models';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from '../../dialogs/dialog-component/dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddProfileComponent implements OnInit {
    @Input() userId = 0;
    selectedAreas: number[] = [];
    selectedCategory: number[] = [];
    tooManyImages: boolean = false;
    tooManyImagesMessage: string = 'Prea multe imagini selectate, va rugam alegeti din nou!';
  
    // Common User Information
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
    isBusinessAccount: boolean = true;
    isLegalPerson: boolean = false;

    isMobile: Observable<boolean>;
      constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, @Inject(Dialog) public dialog: Dialog, private router: Router) {
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
      if (this.isBusinessAccount && (this.nullOrEmpty(this.businessName) ||this.nullOrEmpty(this.businessEmail) || this.nullOrEmpty(this.description) || this.cityId == null || this.countyId == null || this.selectedAreas.length == 0 || this.convertedSelectedImages.length == 0 || this.convertedSelectedProfileImage == '' || this.phoneNumber == '')){
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
    var profile = {
        businessName: this.businessName,
        businessEmail: this.businessEmail,
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

    this.apiService.addProfile(this.userId, profile as CreateProfile)
      .subscribe({
        next: (response) => {
          // Handle successful response
          this.openSuccessDialog();
          this.router.navigate(['/profil']);
        },
        error: (error) => {
          // Handle error
          this.openFailureDialog();
        }
      });
    }

    openSuccessDialog(): void {
      this.dialog.open(DialogComponent, {
        width: '400px',
        data: {
          message: 'Profilul a fost adăugat cu succes și a fost trimis spre aprobare!',
          isSuccess: true
        }
      });
    }
  
    openFailureDialog(): void {
      this.dialog.open(DialogComponent, { 
        width: '400px',
        data: {
          message: 'A apărut o eroare. Vă rugăm să încercați din nou.',
          isSuccess: false
        }
      });
    }
  }
