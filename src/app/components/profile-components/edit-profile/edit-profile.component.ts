import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, switchMap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { DialogComponent } from '../../dialogs/dialog-component/dialog.component';
import { UsedImage, Category, City, County, CreateUser, EditProfile, EditUser, Image } from '../../../Models/Models';
import { ApiService } from '../../../Services/ApiService';
import { AuthService } from '../../../Services/AuthService';
import { UserRole } from '../../../Utilities/enums/Enums';

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
  alreadyExistingRegCom: boolean = false;
  saving: boolean = false;


  selectedAreas: number[] = [];
  selectedCategories: number[] = [];
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
    businessRegCom: string = '';
    category: string = '';
    description: string = '';
    selectedImages: File[] = [];
    selectedProfileImage: File[] = [];
    convertedSelectedImages: string[] = [];
    convertedSelectedProfileImage: string = '';
    convertedSelectedImagesToShow: string[] = [];
    convertedSelectedProfileImageToShow: string = '';
    
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
      constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver, private apiService: ApiService, private authService: AuthService, private router: Router, private route: ActivatedRoute, @Inject(MatDialog) private dialog: MatDialog) {
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches)
          );
      }
  
    ngOnInit(): void {
      this.route.params.subscribe((params: { [x: string]: string | number; }) => {
        // Extract profileId from route parameters
        this.currentProfileId = +params['id']; // Assuming 'id' is the parameter name in the route
        // You may need to use a different parameter name based on your route configuration
      });
      if (this.currentProfileId == undefined || this.currentProfileId == 0 || this.currentProfileId == null){
        this.router.navigate(['/acasa']);
      }

        if (!this.authService.isAuthenticated()){
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

          if (!this.nullOrEmpty(profile.businessCUI) && !this.nullOrEmpty(profile.businessRegCom)){
            this.isLegalPerson = true;
            this.alreadyExistingCUI = true;
            this.alreadyExistingRegCom = true;
          }

          this.businessCUI = profile.businessCUI;
          this.businessName = profile.businessName;
          this.businessEmail = profile.businessEmail;
          this.countyId = profile.countyId;
          this.cityId = profile.cityId;
          this.selectedAreas = profile.areaOfInterest;
          this.selectedCategories = profile.categoryIds;
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
        
      }
    }

    toggleLegalPerson(){
      
    }

    onImagesSelected(event: any) {
      const files: File[] = Array.from(event.target.files);

      if (files.length > this.maximumNumberAllowed){
        this.tooManyImages = true;
        return;
      }

      this.tooManyImages = false;

      this.convertedSelectedImages = [];
      this.convertedSelectedImagesToShow = [];

      files.forEach(file => {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          // Extract the base64 data part
          const base64Image = e.target.result as string;
          this.convertedSelectedImagesToShow.push(base64Image);
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
          this.convertedSelectedProfileImageToShow = base64Image;
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
      if (this.nullOrEmpty(this.businessName) || this.nullOrEmpty(this.businessEmail) || this.nullOrEmpty(this.description) || this.cityId == null || this.countyId == null || this.selectedAreas.length == 0 || this.selectedCategories.length == 0){
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
      this.saving = true;
    var profile = {
      profileId: this.currentProfileId,
      businessName: this.businessName,
      businessEmail: this.businessEmail,
      businessCUI: this.businessCUI,
      categoryIds: this.selectedCategories,
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

    

    this.apiService.editProfile(profile).subscribe({
      next: (response) => {
        // Handle successful response
        this.router.navigate(['/profil']);
        this.openSuccessDialog();
      },
      error: (error) => { 
        // Handle error
        this.openFailureDialog();
      }
    });
    }

    onCheckboxChange(existingImage: any){
      if (existingImage.isMaintained == false){
        this.imagesToDelete.push(existingImage.imageId);
      }else{
        this.imagesToDelete = this.imagesToDelete.filter(x => x!== existingImage.imageId);
      }
      this.maximumNumberAllowed = this.imagesLimit - this.existingImages.filter(x => x.isMaintained == true).length;
    }

    onDeleteImage(existingImage: any){
      this.imagesToDelete.push(existingImage.imageId);
      this.existingImages = this.existingImages.filter(x => x.imageId !== existingImage.imageId);
      this.maximumNumberAllowed = this.imagesLimit - this.existingImages.filter(x => x.isMaintained == true).length;
    }

    onDeleteAddedImage(addedImage: any){
      const base64Data = addedImage.split(',')[1];
      this.convertedSelectedImagesToShow = this.convertedSelectedImagesToShow.filter(img => img != addedImage);
      this.convertedSelectedImages = this.convertedSelectedImages.filter(img => img != base64Data);
    }

    openSuccessDialog(): void {
      this.dialog.open(DialogComponent, {
        width: '400px',
        data: {
          message: 'Schimbarile au fost salvate cu succes si au fost trimise spre aprobare!',
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

  