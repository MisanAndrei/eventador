import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { ProfileCard, Section } from "src/app/Models/Models";

@Component({
    selector: 'app-popular-customers-tab',
    templateUrl: './popular-customers-tab.component.html',
    styleUrls: ['./popular-customers-tab.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })

  export class PopularCustomersTabComponent implements OnInit {
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

    onCardClick(profileId: number){
      this.router.navigate(['/furnizor', profileId]);
    }

  }