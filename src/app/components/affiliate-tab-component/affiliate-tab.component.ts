import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Section } from 'src/app/Models/Models';
import { AuthService } from 'src/app/Services/AuthService';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-affiliate-tab',
  templateUrl: './affiliate-tab.component.html',
  styleUrls: ['./affiliate-tab.component.css']
})
export class AffiliateTabComponent {
  @Input() section?: Section;
  isMobile: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver, @Inject(PLATFORM_ID) private platformId: Object){
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  }
  
  openWhatsApp(): void {
    const phone = '40740299643'; // no +, no spaces
    const url = `https://wa.me/${phone}?text=${encodeURIComponent('Salut! Și eu vreau să devin afiliat. 🤝')}`;
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }
}