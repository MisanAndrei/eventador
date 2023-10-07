import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  showFilter: boolean = false;
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedZone: string = '';

  zones: any[] = [
    { id: 1, name: 'Zone 1' },
    { id: 2, name: 'Zone 2' },
    // Add more zones as needed
  ];
  
  categories: any[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    // Add more categories as needed
  ];


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

      applyFilters() {
        // Implement your filtering logic here using the searchTerm, selectedCategory, and selectedZone
        console.log('Search Term:', this.searchTerm);
        console.log('Selected Category:', this.selectedCategory);
        console.log('Selected Zone:', this.selectedZone);
      }

      clearFilters() {
        // Implement your filtering logic here using the searchTerm, selectedCategory, and selectedZone
        console.log('Search Term:', this.searchTerm);
        console.log('Selected Category:', this.selectedCategory);
        console.log('Selected Zone:', this.selectedZone);
      }

      toggleFilter() {
        this.showFilter = !this.showFilter;
      }
}