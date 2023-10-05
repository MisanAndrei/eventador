import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  
    cards: any[] = [
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        { name: 'Misan Andrei', imageUrl: 'https://eventador.ro/uploads/2019/03/PHOTO-2018-09-21-15-52-43.jpg', description: 'Cea mai eleganta imbracaminte pentru tine!', location: 'Cluj-Napoca', categoryDescription: 'Imbracaminte' },
        // Add more cards as needed
      ];
      
      isMobile: Observable<boolean>;
      constructor(private breakpointObserver: BreakpointObserver) {
        this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches)
          );
      }
}