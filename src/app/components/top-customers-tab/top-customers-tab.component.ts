import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { ProfileCard, Section } from "../../Models/Models";


@Component({
    selector: 'app-top-customers-tab',
    templateUrl: './top-customers-tab.component.html',
    styleUrls: ['./top-customers-tab.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })

  export class TopCustomersTabComponent implements OnInit {
    @Input() cards?: ProfileCard[];
    @Input() section?: Section;

    isMobile: Observable<boolean>;
    constructor(private breakpointObserver: BreakpointObserver, private router: Router){
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches)
          );
    }
  ngOnInit(): void {

  }

    onDragStart(event: DragEvent): void {
        if (event.dataTransfer) {
          event.dataTransfer.setData('text/plain', (event.target as HTMLDivElement).innerText);
          (event.target as HTMLDivElement).classList.add('dragging');
        }
      }
    
    onDragEnd(event: DragEvent): void {
        (event.target as HTMLDivElement).classList.remove('dragging');
      }

    onCardClick(profile: ProfileCard){
      const formattedProfileName = this.formatProfileName(profile.name);
        this.router.navigate(['/furnizor', `${formattedProfileName}-${profile.id}`]);
    }

    formatProfileName(profileName: string): string {
      return profileName.replace(/\s+/g, '-');
    }

    getStarsArray(rating: number): Array<{ full: boolean; half: boolean; empty: boolean }> {
      const stars: Array<{ full: boolean; half: boolean; empty: boolean }> = [];
      
      const wholeStars = Math.floor(rating); // Number of fully filled stars
    const hasHalfStar = rating % 1 !== 0; // Check if we need a half star
    const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars
  
    for (let i = 0; i < wholeStars; i++) {
      stars.push({ full: true, half: false, empty: false });
    }
  
    if (hasHalfStar) {
      stars.push({ full: false, half: true, empty: false });
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push({ full: false, half: false, empty: true });
    }
  
    return stars;
    }

  }