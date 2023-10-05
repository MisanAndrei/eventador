import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})

export class AboutUsComponent implements OnInit{
    public title: string = 'Despre Noi'; 
    public categories: string[] = [];
    public secondSectionDescription: string = 'Dacă te întrebi cine suntem, te invităm să afli direct de la noi! Împreună cu tine și cu toți colaboratorii din domeniul evenimentelor, vom face ca eventador.ro să ajungă în cel mai scurt timp, cea mai mare platformă online de organizare evenimente din România. \n \n Ne aflăm în primul an de la lansare și scopul nostru este să-ți oferim tot suportul și toate informațiile de care ai nevoie pentru ca evenimentul tău să fie un real succes.';

    ngOnInit(): void {
        this.categories = [ "Artisti",
    "Locații",
    "Foto-Video",
    "Flori",
    "Dulce",
    "Trupe",
    "M.C.",
    "Deejays",
    "Cocktail Bars",
    "Vestimentație / Accesorii – Ea",
    "Vestimentație / Accesorii – El",
    "Saloane",
    "Gheață Carbonică / Artificii",
    "Photo Booth",
    "Lumini",
    "Limuzine",
    "Aranjamente Locație",
    "Invitații / Mărturii",
    "Hostess",
    "Wedding Planners",
    "Zâne Ursitoare",
    "Dansatori / Coregrafi",
    "Bijuterii",
    "Băuturi",
    "Catering",
    "Diverse",
    "Make-up Artiști",
    "Fotografi",
    "Personal Trainers",
    "Vacanțe"];
    }
}