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
}