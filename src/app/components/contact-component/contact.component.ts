import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit{
    public title: string = 'Contact';
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}