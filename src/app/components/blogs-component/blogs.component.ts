import {  Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  isMobile: Observable<boolean>;
  cards = [
    { title: 'De ce e important sa participi la targurile de nunti?', itemsPerRow: 1, content: 'Primavara e momentul  in care au loc cele mai asteptate avenimente pentru viitori miri, targurile de nunti. Astfel, pentru acestia este o oportunitate sa interactioneze cu toti acei furnizori care le pot facilita...', category: 'Eveniment', image: 'https://eventador.ro/uploads/2020/09/54a1fea4cf023250ddba79d24d0d0345.jpg' },
    { title: 'Pasii catre un eveniment de vis', itemsPerRow: 3, content: 'Momentul in care iei deciziea pentru acest eveniment...', category: 'Flori', image: 'https://eventador.ro/uploads/2018/07/HaiForLimousine-50.jpg' },
    { title: 'Cele mai importante lucruri de stiut', itemsPerRow: 3, content: 'Sunt multe lucruri care trebuie stiute inainte de a incepe alegerea furnizorilor', category: 'Baruri', image: 'https://eventador.ro/uploads/2021/04/1a6a6f03614c25e1789fbada2c02b869.jpg' },
    { title: 'Ce e imporatnt de stiut', itemsPerRow: 3, content: 'Aici ai un ghid gratuit si util inainte de a incepe pregatirile pentru nunta in functie de stilul dorit...', category: 'Vestimentatie', image: 'https://eventador.ro/uploads/2018/07/Bolboaca-Violeta1-100.jpg' },
    { title: 'Locatia, una dintre cele mai grele decizii', itemsPerRow: 2, content: 'Locatia iti va decide restul furnizorilor deci trebuie sa ai mare grija inainte de alegerea acesteia', category: 'Locatii', image: 'https://eventador.ro/uploads/2019/05/0b8be5c58e45e0a5ebe76150a98a7a4d.png' },
    { title: 'Florile alese sunt importante', itemsPerRow: 2, content: 'Florile dau culoare evenimentului deci locatia si aranjamentele trebuie sa fie intr-o armonie......', category: 'M.C', image: 'https://eventador.ro/uploads/2020/09/54a1fea4cf023250ddba79d24d0d0345.jpg' },
    { title: 'Dansul mirilor asa cum ai visat', itemsPerRow: 1, content: 'Dansul mirilor da startul petrecerii deci trebuie sa ai mare grija ce transmiti invitatiilor...', category: 'Recenzii', image: 'https://eventador.ro/uploads/2019/05/0b8be5c58e45e0a5ebe76150a98a7a4d.png' },
    { title: 'Cele mai frumoase dansuri', itemsPerRow: 3, content: 'Daca nu stii inca ce ti se potriveste tie si partenerului/parteneri tau/tale te invitam sa citesti acest mic ghid', category: 'Flori', image: 'https://eventador.ro/uploads/2019/06/b1027b7f85bab13da683a1a810538576.jpeg' },
    // Add more blogs as needed
  ];
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {   
      for (let i = 0; i < this.cards.length; i++) {
        if (i % 6 === 0) {
          this.cards[i].itemsPerRow = 1;
        } else if (i % 6 === 1 || i % 6 === 2 || i % 6 === 3) {
          this.cards[i].itemsPerRow = 3;
        } else {
          this.cards[i].itemsPerRow = 2;
        }
    }
  }
}