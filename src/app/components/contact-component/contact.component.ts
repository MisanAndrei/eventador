import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    isMobile: Observable<boolean>;

    constructor(private breakpointObserver: BreakpointObserver) {
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
            .pipe(map(result => result.matches));
    }

    ngOnInit(): void {
        // Additional initialization if needed
    }

    openWhatsApp(): void {
        const phone = '40740299643'; // no +, no spaces
        const url = `https://wa.me/${phone}?text=${encodeURIComponent('Bună ziua! Am o întrebare legată de serviciile dvs.')}`;
        window.open(url, '_blank');
      }
}