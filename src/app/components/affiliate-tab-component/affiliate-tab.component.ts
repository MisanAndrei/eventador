import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Section } from 'src/app/Models/Models';

@Component({
  selector: 'app-affiliate-tab',
  templateUrl: './affiliate-tab.component.html',
  styleUrls: ['./affiliate-tab.component.css']
})
export class AffiliateTabComponent {
  @Input() section?: Section;
  isMobile: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver){
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  }
  
  openWhatsApp(): void {
    const phone = '40740299643'; // no +, no spaces
    const url = `https://wa.me/${phone}?text=${encodeURIComponent('Salut! Și eu vreau să devin afiliat. 🤝')}`;
      window.open(url, '_blank');
  }
}