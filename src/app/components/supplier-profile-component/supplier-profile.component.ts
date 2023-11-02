import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Category } from 'src/app/Models/Models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-supplier-profile',
    templateUrl: './supplier-profile.component.html',
    styleUrls: ['./supplier-profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })

  export class SupplierProfileComponent implements OnInit  {
    isMobile: Observable<boolean>;
    emailIcon: string = 'https://eventador.ro/images/mail-icon.svg';
    phoneIcon: string = 'https://eventador.ro/images/phone-icon.svg';
    

    showEnlargedView: boolean = false;
    selectedImageIndex: number = 0;

    images: string[] = ['https://eventador.ro/uploads/2019/02/rotar2.jpeg', 'https://eventador.ro/uploads/2019/02/rotar3.jpeg', 
                        'https://eventador.ro/uploads/2019/03/a56d6a3204cc73d5a3a60edd9c3397b5.jpg', 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg',
                        'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-2@2x-50.jpg', 
                        'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-3@2x-50.jpg'];

    imageObject: any = [{image: '', thumbImage: 'https://eventador.ro/uploads/2019/02/rotar2.jpeg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2019/02/rotar3.jpeg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2019/03/a56d6a3204cc73d5a3a60edd9c3397b5.jpg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-3@2x-50.jpg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-1@2x-50.jpg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2019/03/e2cfa33521c09b0a39cbaca2ce4ffe03.jpg', title: ''},
                          {image: '', thumbImage: 'https://eventador.ro/uploads/2018/07/Claudiu-Moldovan-2@2x-50.jpg', title: ''}]
    
    //model
    profileImage: string = 'https://eventador.ro/uploads/2019/02/rotar1.jpeg';
    profileName:string = 'Misan Andrei';
    categories: Category[] = [{id: 1, name: 'M.C'}, {id: 2, name: 'Vestimentatie Si Accesorii - El'}]
    motto: string = 'Cel mai mare mestru de ceremonii';
    county: string = 'Cluj';
    city: string = 'Cluj-Napoca';
    location: string = 'din ' + this.county + ', ' + this.city;
    description: string = 'Iulia Mărgărit – Event Manager – Concertcumireasa „Pentru ca nu m-am putut hotărî ce iubesc mai mult să fac, dar știind că iubesc să lucrez cu oamenii și să îi văd' + 
    ' fericiți, am ales actoria! Dacă esști artist trebuie să ai un strop de nebunie! Am decis să învăț să o controlez învățând psihologia!' + 
    'Am o experiență prețioasă în ceea ce privește lucrul cu oamenii, atât cu cei mici cât și cu cei mari, dar mai ales multă răbdare!' +
    'Cea mai mare împlinire vine atunci când oamenii cu care lucrăm se transformă în prieteni!'+
    'Livia Taloi – Event Manager – Concertcumireasa' +
    '„Concertcumireasa este înainte de toate un vis devenit realitate!'+
    'Experiența acumulată în televiziune, actorie, muzică, dans, sutele de evenimente la care am participat, '+
    'dar și micile „escapade” în design, chiar și bricolaj, construcții, grădinărit și croitorie, mă ajută acum în organizarea de evenimente.'+
    'După propriul eveniment m-am ocupat de evenimentele prietenilor, care pe lângă faptul că au fost foarte încântați, m-au îndemnat să urmez această cale.'+
    'Momentul în care mi-am întâlnit „sufletul pereche” în acest domeniu, pe colega și prietena mea, Iulia, am simțit o completare perfectă, iar brand-ul „Concertcumireasa” a prins contur.'+
    'O nuntă nu este suficient de spectactuloasă dacă nu are un aer de';
    constructor(private ref: ChangeDetectorRef, private breakpointObserver: BreakpointObserver){
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
    }

    openEnlargedView(index: number) {
      console.log('merge apasatu');
      this.selectedImageIndex = index;
      this.showEnlargedView = true;
      this.ref.detectChanges();
    }
  
    closeEnlargedView() {
      this.showEnlargedView = false;
    }
    
    ngOnInit(): void {
        
    }

  }