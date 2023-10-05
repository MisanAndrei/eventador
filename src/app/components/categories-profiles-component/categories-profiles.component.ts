import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileCard } from 'src/app/Models/Models';
 

@Component({
  selector: 'app-categories-profiles',
  templateUrl: './categories-profiles.component.html',
  styleUrls: ['./categories-profiles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesProfilesComponent implements OnInit {
  categories: string[] = ['']
  profilecards: ProfileCard[];
  searchedProfileCards: ProfileCard[];
  value = '';
constructor(private ref:  ChangeDetectorRef){
  this.profilecards = [{
    name: 'Misan Andrei',
    location: 'Cluj-Napoca',
    image: 'https://eventador.ro/uploads/2018/07/Alexandru-Curea1-50.jpg',
    description: 'Garda se tine, nu se suna',
    categoryId: 1
  },
  {
    name: 'Sechei Radu',
    location: 'Cluj-Napoca',
    image: 'https://eventador.ro/uploads/2019/02/rotar1.jpeg',
    description: 'Capacele se dau, nu se pun pe roti',
    categoryId: 2
  },
  {
    name: 'Varga Alex',
    location: 'Cluj-Napoca',
    image: 'https://eventador.ro/uploads/2018/07/Alexandru-Curea1-50.jpg',
    description: 'Tigaia se tine pe aragaz, nu in parcare',
    categoryId: 3
  },
]

  

  for (let i = 0; i < 100; i++){
    this.profilecards.push(this.profilecards[0]);
    this.profilecards.push(this.profilecards[1]);
    this.profilecards.push(this.profilecards[2]);
  }

  this.searchedProfileCards = this.profilecards;
  
}
  
ngOnInit(): void {
    this.categories = [ "Toate categoriile", "Artisti",
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

  inputChanged(){
    if (this.value.length >= 3){
      this.searchedProfileCards = this.profilecards.filter(x => x.name.toLowerCase().includes(this.value.toLowerCase()));
    }
    else{
      this.searchedProfileCards = this.profilecards;
    }
    this.ref.detectChanges();
  }

  inputCleared(){
    this.value='';
    this.searchedProfileCards = this.profilecards;
    this.ref.detectChanges();
  }

  


}