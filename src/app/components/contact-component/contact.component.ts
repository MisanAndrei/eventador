import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/Services/AuthService";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    isMobile: Observable<boolean>;
    userLoggedIn: boolean = true;

    constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
            .pipe(map(result => result.matches));
    }

    ngOnInit(): void {
        this.userLoggedIn = this.authService.isAuthenticated();
    }

    openWhatsApp(): void {
        const phone = '40740299643'; // no +, no spaces
        const url = `https://wa.me/${phone}?text=${encodeURIComponent('Salut! Și eu vreau să devin afiliat. 🤝')}`;
        window.open(url, '_blank');
      }
}