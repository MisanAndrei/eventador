import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-popular-customers-tab',
    templateUrl: './popular-customers-tab.component.html',
    styleUrls: ['./popular-customers-tab.component.css']
  })

  export class PopularCustomersTabComponent {
    suppliers: any[] = [
        { name: 'Outfit Men', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', category: 'Imbracaminte' },
        { name: 'Escape Garden Dej', image: 'https://eventador.ro/uploads/2018/07/Escape-Club-Gherla-2@2x-50.jpg', category: 'Locatii' },
        { name: 'Imperial Ballroom Cluj', image: 'https://eventador.ro/uploads/2018/07/Imperial-Ballroom-Cluj-1@2x-50.jpg', category: 'Locatii' },
        { name: 'Adore Chocolaterie', image: 'https://eventador.ro/uploads/2018/08/2018_02_Inghetata_CatalinHladi-1946.jpg', category: 'Dulce?' },
        { name: 'Diamann', image: 'https://eventador.ro/uploads/2020/08/b7bdcfed07755dc44c650fef7122aee3.jpg', category: 'Bijuterii' }/*,
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' }*/,
        
      ];


    constructor(){

    }

    onDragStart(event: DragEvent): void {
        if (event.dataTransfer) {
          event.dataTransfer.setData('text/plain', (event.target as HTMLDivElement).innerText);
          (event.target as HTMLDivElement).classList.add('dragging');
        }
      }
    
    onDragEnd(event: DragEvent): void {
        (event.target as HTMLDivElement).classList.remove('dragging');
      }


  }