import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Category } from 'src/app/Models/Models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/ApiService';

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

    imageObject: any = [];
    
    //model
    profileImage?: string;
    profileName?:string;
    categoryName?: string;
    motto?: string;
    city?: string;
    location?: string;
    description?: string;


    constructor(private ref: ChangeDetectorRef, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router, private apiService: ApiService){
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
    }
    
    ngOnInit(): void {
      this.profileId = this.route.snapshot.paramMap.get('id') ?? '';
      
      if (isNaN(Number(this.profileId)) && this.changesProfileId == undefined) {
        this.router.navigate(['/furnizori']);
      } else {
        if (this.changesProfileId != undefined){
          this.apiService.getUserProfile(this.changesProfileId).subscribe(response => {
            console.log(response);
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
            this.websiteUrl = response.websiteUrl;
            this.facebookUrl = response.facebookUrl;
            this.instagramUrl = response.instagramUrl;
            this.youtubeUrl = response.youtubeUrl;
          })
        }
        else{
          this.apiService.getUserProfile(Number(this.profileId)).subscribe(response => {
            console.log(response);
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
            this.websiteUrl = response.websiteUrl;
            this.facebookUrl = response.facebookUrl;
            this.instagramUrl = response.instagramUrl;
            this.youtubeUrl = response.youtubeUrl;
          })
        }
      }
    }
  }