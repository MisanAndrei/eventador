import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfileCard } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-personal-profiles',
  templateUrl: './personal-profiles.component.html',
  styleUrls: ['./personal-profiles.component.css']
})
export class PersonalProfilesComponent implements OnInit {
  @Input() personalProfiles!: number[];
  @Input() forApprovalPersonalProfiles!: boolean;
  profileCards: ProfileCard[] = [];
    isMobile: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
   }

  ngOnInit(): void {
    if (!this.forApprovalPersonalProfiles){
        this.apiService.getProfileCardsByIds(this.personalProfiles).subscribe(x => {
            this.profileCards = x;
        })
    }else{
        //profiles waiting for approval
    }
    
  }

  onCardClick(profileId: number){
    this.router.navigate(['/furnizor', profileId]);
  }

  editProfile(event: Event, profileId: number){
    event.stopPropagation();
    this.router.navigate(['/EditareProfil', profileId]);
  }
}