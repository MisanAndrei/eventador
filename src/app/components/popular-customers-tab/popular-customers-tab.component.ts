import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-popular-customers-tab',
    templateUrl: './popular-customers-tab.component.html',
    styleUrls: ['./popular-customers-tab.component.css']
  })

  export class PopularCustomersTabComponent {
    customers: any[] = [
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' },
        { name: 'Misan Andrei', image: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', motto: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', category: 'Imbracaminte' }/*,
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