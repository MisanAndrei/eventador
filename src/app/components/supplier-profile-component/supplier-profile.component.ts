import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Category, Review, SendReview } from 'src/app/Models/Models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { UserRole } from 'src/app/Utilities/enums/Enums';

@Component({
    selector: 'app-supplier-profile',
    templateUrl: './supplier-profile.component.html',
    styleUrls: ['./supplier-profile.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })

  export class SupplierProfileComponent implements OnInit  {
    @Input() changesProfileId: number | undefined;

    profileId: string = '';
    isMobile: Observable<boolean>;
    phoneNumber?: string;
    email?: string;
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    reviews?: Review[];
    numberProfileId!: number;
    currentUserId?: number;
    currentUserRole?: UserRole;
    isCurrentProfileLogged: boolean = false;
    customerUserLoggedId: boolean = false;
    userLoggedIn: boolean = false;
    reviewSent: boolean = false;


    imageObject: any = [];
    
    //model
    profileImage?: string;
    profileName?:string;
    categoryName?: string;
    motto?: string;
    city?: string;
    location?: string;
    description?: string;

    //rating part
    selectedRating: number = 0;
    reviewText: string = '';
    offerRating: boolean = false;


    constructor(private ref: ChangeDetectorRef, 
      private breakpointObserver: BreakpointObserver, 
      private route: ActivatedRoute, 
      private router: Router, 
      private apiService: ApiService, 
      private authService: AuthService){
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
    }
    
    ngOnInit(): void {
      this.profileId = this.route.snapshot.paramMap.get('id') ?? '';
      
      if (this.authService.isUserLogged()){
        this.userLoggedIn = true;
        var user = this.authService.getLoggedUser();
        this.currentUserRole = user.role;
        this.currentUserId = user.id;
        if (this.profileId != undefined && user.profilesIds?.includes(Number(this.profileId))){
          this.isCurrentProfileLogged = true;
        }
      }

      if (isNaN(Number(this.profileId)) && this.changesProfileId == undefined) {
        this.router.navigate(['/furnizori']);
      } else {
        if (this.changesProfileId != undefined){
          this.apiService.getProfileToReview(this.changesProfileId).subscribe(response => {
            this.imageObject = response.images.map(x => ({
              image: x.imageUrl,
              thumbImage: x.imageUrl,
              title: ''
            }))
            this.profileName = response.businessName;
            this.profileImage = response.images.filter(x => x.isProfileImage == true).map(x => x.imageUrl)[0];
            this.motto = response.motto;
            this.location = response.cityName;
            this.categoryName = response.categoryName;
            this.phoneNumber = response.phoneNumber;
            this.email = response.email;
            this.description = response.description;
            this.websiteUrl = response.websiteUrl ? this.addHttpPrefix(response.websiteUrl) : undefined;
            this.facebookUrl = response.facebookUrl ? this.addHttpPrefix(response.facebookUrl) : undefined;
            this.instagramUrl = response.instagramUrl ? this.addHttpPrefix(response.instagramUrl) : undefined;
            this.youtubeUrl = response.youtubeUrl ? this.addHttpPrefix(response.youtubeUrl) : undefined;
          })
        }
        else{
          this.apiService.getUserProfile(Number(this.profileId)).subscribe(response => {
            this.imageObject = response.images.map(x => ({
              image: x.imageUrl,
              thumbImage: x.imageUrl,
              title: ''
            }))
            this.profileName = response.businessName;
            this.profileImage = response.images.filter(x => x.isProfileImage == true).map(x => x.imageUrl)[0];
            this.motto = response.motto;
            this.location = response.cityName;
            this.categoryName = response.categoryName;
            this.phoneNumber = response.phoneNumber;
            this.email = response.email;
            this.description = response.description;
            this.websiteUrl = response.websiteUrl ? this.addHttpPrefix(response.websiteUrl) : undefined;
            this.facebookUrl = response.facebookUrl ? this.addHttpPrefix(response.facebookUrl) : undefined;
            this.instagramUrl = response.instagramUrl ? this.addHttpPrefix(response.instagramUrl) : undefined;
            this.youtubeUrl = response.youtubeUrl ? this.addHttpPrefix(response.youtubeUrl) : undefined;
            this.numberProfileId = Number(this.profileId);
            this.reviews = response.reviews;
          })
        }
      }

      

    }

    setRating(rating: number): void {
      this.selectedRating = rating;
    }
  
    submitReview(): void {
      var review = {
        score: this.selectedRating,
        reviewText: this.reviewText,
        userId: this.currentUserId,
        profileId: Number(this.numberProfileId)
      } as SendReview

      this.apiService.saveReview(review);
      this.reviewSent = true;
      // Add your logic to submit the review to the server or perform any other actions
    }

    isReviewIncomplete(){
      if (this.reviewText == '' || this.selectedRating == 0){
        return true;
      }
      return false;
    }

    showRatingInput(){
      this.offerRating = true;
    }

    addHttpPrefix(url: string): string {
      // Check if the URL has a valid protocol (http:// or https://)
      const hasValidProtocol = /^https?:\/\//i.test(url);
    
      // If not, add the http:// prefix
      if (!hasValidProtocol) {
        return `http://${url}`;
      }
    
      // If already has a valid protocol, return the original URL
      return url;
    }
  }