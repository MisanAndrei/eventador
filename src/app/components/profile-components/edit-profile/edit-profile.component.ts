import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category, City, County, CreateUser, EditProfile, EditUser, Image, UsedImage } from 'src/app/Models/Models';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditProfileComponent implements OnInit {
  imagesLimit: number = 5;
  maximumNumberAllowed: number = 5;
  alreadyExistingCUI: boolean = false;


  selectedAreas: number[] = [];
  selectedCategory!: number;
  tooManyImages: boolean = false;
  tooManyImagesMessage: string = 'Prea multe imagini selectate, va rugam alegeti din nou!';
  
  // Common User Information

    currentProfileId: number | undefined;
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
    
    imagesToDelete: number[] = [];


    //existing images
    existingProfileImage!: string;
    existingImages: UsedImage[] = [];

    //just for testing
    cities: City[] = [];
    counties: County[] = [];
    areas: County[] = [];
    categories: Category[] = [];

    // Toggle for Business Account
    isBusinessAccount: boolean = false;
    isLegalPerson: boolean = false;

    isMobile: Observable<boolean>;
      constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches)
          );
      }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        // Extract profileId from route parameters
        this.currentProfileId = +params['id']; // Assuming 'id' is the parameter name in the route
        // You may need to use a different parameter name based on your route configuration
      });
      if (this.currentProfileId == undefined || this.currentProfileId == 0 || this.currentProfileId == null){
        this.router.navigate(['/acasa']);
      }

        if (!this.authService.isUserLogged()){
          this.router.navigate(['/acasa']);
        }

        const user = this.authService.getLoggedUser();

        if (!user.profilesIds?.includes(this.currentProfileId ?? 0)){
          this.router.navigate(['/acasa']);
        }
        
        this.apiService.getCategories().pipe(
          switchMap(categories => {
            this.categories = categories;
            return this.apiService.getCounties();
          }),
          switchMap(areas => {
            this.areas = areas;
            this.counties = areas;
            return this.apiService.getProfileToBeEdited(this.currentProfileId ?? 0);
          })
        ).subscribe(profile => {

          this.apiService.getCities(profile.countyId).subscribe(x => {
            this.cities = x;
          });

          if (!this.nullOrEmpty(profile.businessCUI)){
            this.isLegalPerson = true;
            this.alreadyExistingCUI = true;
          }

          this.businessCUI = profile.businessCUI;
          this.businessName = profile.businessName;
          this.businessEmail = profile.businessEmail;
          this.countyId = profile.countyId;
          this.cityId = profile.cityId;
          this.selectedAreas = profile.areaOfInterest;
          this.selectedCategory = profile.categoryId;
          this.motto = profile.motto ?? '';
          this.websiteUrl = profile.websiteUrl ?? '';
          this.facebookUrl = profile.facebookUrl ?? '';
          this.instagramUrl = profile.instagramUrl ?? '';
          this.youtubeUrl = profile.youtubeUrl ?? '';
          this.description = profile.description;
          this.existingProfileImage = profile.existingProfileImage.imageUrl ?? '';
          this.existingImages = profile.existingImages.map((profileExistingImages: Image) => {
            return {
              imageId: profileExistingImages.id,
              imageUrl: profileExistingImages.imageUrl,
              isMaintained: true
            } as UsedImage
          });
          this.maximumNumberAllowed = this.imagesLimit - this.existingImages.length;
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

      if (files.length > this.maximumNumberAllowed){
        this.tooManyImages = true;
        return;
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
      if (this.nullOrEmpty(this.businessName) || this.nullOrEmpty(this.businessEmail) || this.nullOrEmpty(this.description) || this.cityId == null || this.countyId == null || this.selectedAreas.length == 0){
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
      profileId: this.currentProfileId,
      businessName: this.businessName,
      businessEmail: this.businessEmail,
      businessCUI: this.businessCUI,
      categoryId: this.selectedCategory,
      motto: this.motto,
      cityId: this.cityId,
      areaOfInterest: this.selectedAreas,
      images: this.convertedSelectedImages,
      description: this.description,
      websiteUrl: this.websiteUrl,
      facebookUrl: this.facebookUrl,
      youtubeUrl: this.youtubeUrl,
      instagramUrl: this.instagramUrl,
      imagesToDelete: this.imagesToDelete,
      profileImage : this.convertedSelectedProfileImage
    } as EditProfile

    

    this.apiService.editProfile(profile).subscribe(x => {
      console.log(x);
    });
    }

    checkPasswordIncorrect(){
      if (this.password != '' && this.passwordVerified != '' && this.password != this.passwordVerified){
        return true;
      }

      return false;
    }

    onCheckboxChange(existingImage: any){
      if (existingImage.isMaintained == false){
        this.imagesToDelete.push(existingImage.imageId);
      }else{
        this.imagesToDelete = this.imagesToDelete.filter(x => x!== existingImage.imageId);
      }
      this.maximumNumberAllowed = this.imagesLimit - this.existingImages.filter(x => x.isMaintained == true).length;
    }


  }

  