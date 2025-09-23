import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfileCard } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog-component/delete-dialog.component';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../dialogs/dialog-component/dialog.component';

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

  constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private apiService: ApiService, private router: Router, @Inject(MatDialog) private dialog: MatDialog) {
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

  onCardClick(profile: ProfileCard): void {
    const formattedProfileName = this.formatProfileName(profile.name);
    this.router.navigate([`/furnizor`, `${formattedProfileName}-${profile.id}`]);
  }  

  editProfile(event: Event, profileId: number){
    event.stopPropagation();
    this.router.navigate(['/EditareProfil', profileId]);
  }

  deleteProfile(event: Event, profileId: number) {
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      data: { text: 'Sunteți sigur că vreți să ștergeți profilul?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.handleDeleteResponse(result, profileId);
    });
  }

  handleDeleteResponse(response: boolean, profileId: number) {
    if (response) {
      this.apiService.deleteProfile(profileId)
      .subscribe({
        next: (response) => {
          // Handle successful response
          this.openSuccessDialog();
        },
        error: (error) => {
          // Handle error
          this.openFailureDialog();
        }
      });

    }
  }

  formatProfileName(profileName: string): string {
    return profileName.replace(/\s+/g, '-');
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'Profilul a fost șters cu succes!',
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