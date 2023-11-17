import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Category } from 'src/app/Models/Models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-supplier-profile',
    templateUrl: './supplier-profile.component.html',
    styleUrls: ['./supplier-profile.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })

  export class SupplierProfileComponent implements OnInit  {
    isMobile: Observable<boolean>;
    emailIcon: string = 'https://eventador.ro/images/mail-icon.svg';
    phoneIcon: string = 'https://eventador.ro/images/phone-icon.svg';
    phoneNumber: string = '0752374685';
    email: string = 'dorel@yahoo.com';
    websiteUrl: string = 'www.eventador.ro';
    facebookUrl: string = 'www.facebook.com';
    instagramUrl: string = 'www.instagram.com';
    youtubeUrl: string = 'www.youtube.com';

    showEnlargedView: boolean = false;
    selectedImageIndex: number = 0;

    images: string[] = ['https://eventador.ro/uploads/2019/02/rotar2.jpeg', 'https://eventador.ro/uploads/2019/02/rotar3.jpeg', 
                        'https://eventador.ro/uploads/2019/03/a56d6a3204cc73d5a3a60edd9c3397b5.jpg', 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg',
                        'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-2@2x-50.jpg', 
                        'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-3@2x-50.jpg'];

    imageObject: any = [{image: 'https://eventador.ro/uploads/2019/02/rotar2.jpeg', thumbImage: 'https://eventador.ro/uploads/2019/02/rotar2.jpeg', title: ''},
                          {image: 'https://eventador.ro/uploads/2019/02/rotar3.jpeg', thumbImage: 'https://eventador.ro/uploads/2019/02/rotar3.jpeg', title: ''},
                          {image: 'https://eventador.ro/uploads/2019/03/a56d6a3204cc73d5a3a60edd9c3397b5.jpg', thumbImage: 'https://eventador.ro/uploads/2019/03/a56d6a3204cc73d5a3a60edd9c3397b5.jpg', title: ''},
                          {image: 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg', thumbImage: 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg', title: ''},
                          {image: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', title: ''},
                          {image: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-3@2x-50.jpg', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-3@2x-50.jpg', title: ''},
                          {image: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', title: ''},
                          {image: 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg', thumbImage: 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg', title: ''},
                          {image: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-2@2x-50.jpg', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-2@2x-50.jpg', title: ''}]
    
    //model
    profileImage: string = 'https://eventador.ro/uploads/2019/02/rotar1.jpeg';
    profileName:string = 'Misan Andrei';
    categories: Category[] = [{id: 2, name: 'Vestimentatie Si Accesorii - El'}]
    motto: string = 'Cel mai mare mestru de ceremonii';
    county: string = 'Cluj';
    city: string = 'Cluj-Napoca';
    
    location: string = 'din ' + this.county + ', ' + this.city;
    description: string = 'Iulia Mărgărit – Event Manager – Concertcumireasa „Pentru ca nu m-am putut hotărî ce iubesc mai mult să fac, dar știind că iubesc să lucrez cu oamenii și să îi văd' + 
    ' fericiți, am ales actoria! Dacă esști artist trebuie să ai un strop de nebunie! Am decis să învăț să o controlez învățând psihologia!' + 
    'Am o experiență prețioasă în ceea ce privește lucrul cu oamenii, atât cu cei mici cât și cu cei mari, dar mai ales multă răbdare!';
    constructor(private ref: ChangeDetectorRef, private breakpointObserver: BreakpointObserver){
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
    }
    
    ngOnInit(): void {
        
    }

  }