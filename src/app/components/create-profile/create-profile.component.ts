import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category, City, County, CreateUser } from 'src/app/Models/Models';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastService } from 'src/app/Services/ToastService';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from '../dialogs/dialog-component/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CreateProfileComponent implements OnInit {
  selectedAreas: number[] = [];
  selectedCategories: number[] = [];
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
    partnerId?: number;
    partnerIdentifier: string = '';
  
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
    maxAllowedFiles: number = 5;
    partnerCode: string = '';
    referralCodeByUrl: boolean = false;
    showPartnerErrorCode: boolean = false;
    showPartnerSuccessCode: boolean = false;

    //partner referral section
    partnerName: string = '';
    partnerNameValid: boolean = false;
    partnerNameInvalid: boolean = false;

    //just for testing
    cities: City[] = [];
    counties: County[] = [];
    areas: County[] = [];
    categories: Category[] = [];

    // Toggle for Business Account
    isBusinessAccount: boolean = false;
    isLegalPerson: boolean = false;

    isMobile!: Observable<boolean>;
      constructor(private breakpointObserver: BreakpointObserver, private router: Router, private dialog: MatDialog, private apiService: ApiService, private route: ActivatedRoute, private toastService: ToastService ) {

      }
  
    ngOnInit(): void {
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

    this.isMobile.subscribe(isMobile => {
      console.log('Is mobile:', isMobile);
    });

      this.route.params.subscribe((params: { [x: string]: string; }) => {
        // Extract profileId from route parameters
        this.partnerIdentifier = params['partnerIdentifier']; 
        
      });

      if (this.partnerIdentifier){
        this.partnerCode = this.partnerIdentifier;
        this.apiService.getPartnerByReferralGuid(this.partnerIdentifier).pipe(
          catchError(error => {
            // Handle the error here
            this.showPartnerErrorCode = true;
            return of(null);
          })
        ).subscribe(x => {
          if (x) {
            this.partnerId = x.id;
            this.showPartnerSuccessCode = true;
            this.referralCodeByUrl = true;
            this.partnerNameValid = true;
          }
        });
      }

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
        this.businessRegCom = '';
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

      if (this.isBusinessAccount && (this.nullOrEmpty(this.businessName) || this.nullOrEmpty(this.businessEmail) || this.nullOrEmpty(this.description) || this.cityId == null || this.countyId == null || this.selectedCategories.length == 0 || this.selectedAreas.length == 0 || this.convertedSelectedImages.length == 0 || this.convertedSelectedProfileImage == '' || this.phoneNumber == '')){
        return false;
      }

      if (this.isLegalPerson && this.nullOrEmpty(this.businessCUI) && this.nullOrEmpty(this.businessRegCom)){
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
      partnerId: this.partnerId,
      profile: {
        businessName: this.businessName,
        businessEmail: this.businessEmail,
        businessCUI: this.businessCUI,
        businessRegCom: this.businessRegCom,
        categoryIds: this.selectedCategories,
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

    this.apiService.createUser(user).subscribe({
      next: () => {
        this.router.navigate(['/acasa']);
        this.openSuccessDialog();
      },
      error: (error) => {
        console.error('Error saving review:', error);
        this.openFailureDialog();
      }
    });

    }

    checkPasswordIncorrect(){
      if (this.password != '' && this.passwordVerified != '' && this.password != this.passwordVerified){
        return true;
      }

      return false;
    }

    onPartnerCodeChange(value: string): void {
      this.partnerCode = value;
      
      if (this.partnerCode.length != 4){
        this.showPartnerErrorCode = true
        this.showPartnerSuccessCode = false;
      }else{
        this.showPartnerErrorCode = false;
        this.showPartnerSuccessCode = false;
        this.apiService.getPartnerByReferralGuid(this.partnerCode).pipe(
          catchError(error => {
            // Handle the error here
            this.showPartnerErrorCode = true;
            this.showPartnerSuccessCode = false;
            return of(null);
          })
        ).subscribe(x => {
          if (x) {
            this.partnerId = x.id;
            this.showPartnerErrorCode = false;
            this.showPartnerSuccessCode = true;
            this.partnerNameValid = true;
          }
        });
      }
    }

    openSuccessDialog(): void {
      this.dialog.open(DialogComponent, {
        width: '400px',
        data: {
          message: 'Profilul a fost adăugat cu succes și a fost trimis spre aprobare, vă puteți autentifica !',
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

  