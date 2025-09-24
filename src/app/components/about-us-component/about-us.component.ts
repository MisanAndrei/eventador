import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, Inject, OnInit } from "@angular/core";
import { Observable, map } from "rxjs";

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})

export class AboutUsComponent implements OnInit{
    isMobile: Observable<boolean>;
sections: any[] = [{id: 1, title: 'Salut si bine ai venit pe eventador.ro!', text: 'Dacă te întrebi cine suntem, te invităm să afli direct de la noi! Împreună cu tine și cu toți colaboratorii din domeniul evenimentelor, vom face ca eventador.ro să ajungă în cel mai scurt timp, cea mai mare platformă online de organizare evenimente din România. Ne aflăm în primul an de la lansare și scopul nostru este să-ți oferim tot suportul și toate informațiile de care ai nevoie pentru ca evenimentul tău să fie un real succes.'},
                    {id: 2, title: 'Orice Tipuri de Evenimente', text: 'Indiferent de tematica petrecerii tale (botez, nuntă, majorat, petrecere privată, etc), noi ținem cont de toate necesitățile tale și ți le punem la dispoziție GRATUIT! De la locații, artiști, trupe, foto / video, aranjamente, barmani, gheată carbonică/artificii, limuzine, la exclusivități feminine cum ar fi flori, bijuterii, rochii de mireasă, saloane de înfrumusețare și tot indispensabilul pentru confortul tău!'}, 
                    {id: 3, title: 'Profile Furnizori Evenimente', text: 'Îți punem la dispoziție site-urile de prezentare și link-urile către rețelele de socializare ale celor mai de seama prestatori de servicii din domeniul evenimentelor precum și contactele actualizate ale acestora, prin intermediul cărora poți lua legătura chiar tu cu ei, evitând astfel intermediarii și comisioanele. De asemenea poți verifica disponibilitatea, tarifele precum și urmări activitatea furnizorului dorit prin intermediul rețelelor de socializare.'},
                    {id: 4, title: 'Tu Alegi', text: 'Alege singur tot ceea ce consideri că este potrivit pentru tine și invitații tăi. Acum ai ocazia să faci acest lucru!'},
                    {id: 5, title: 'Acces Gratuit', text: 'Accesul este gratuit și așa va rămâne. În cel mai scurt timp, vei avea și posibilitatea să descarci și aplicația EVENTADOR disponibilă pentru IOS/Android.'}];

    constructor(private breakpointObserver: BreakpointObserver){
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches)
          );
    }
    public title: string = 'Despre Noi'; 
    public categories: string[] = [];
    public secondSectionDescription: string = 'Dacă te întrebi cine suntem, te invităm să afli direct de la noi! Împreună cu tine și cu toți colaboratorii din domeniul evenimentelor, vom face ca eventador.ro să ajungă în cel mai scurt timp, cea mai mare platformă online de organizare evenimente din România. \n \n Ne aflăm în primul an de la lansare și scopul nostru este să-ți oferim tot suportul și toate informațiile de care ai nevoie pentru ca evenimentul tău să fie un real succes.';

    ngOnInit(): void {
        
    }
}