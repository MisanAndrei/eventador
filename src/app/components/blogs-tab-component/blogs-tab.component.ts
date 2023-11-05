import {  Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-blogs-tab',
  templateUrl: './blogs-tab.component.html',
  styleUrls: ['./blogs-tab.component.css']
})
export class BlogsTabComponent implements OnInit {
  blogs = [{title: "Cum alegi un candy bar bun?", image:"https://eventador.ro/uploads/2018/07/Cofetaria-Pralina-1@2x-50.jpg", content:"Alege cele mai dulci si bune gustari!"},
  {title: "Cele mai tari locatii", image:"https://eventador.ro/uploads/2018/07/Escape-Garden-Dej-5@2x-50.jpg", content:"Alege cele mai dulci si bune gustari!"},
  {title: "Cei mai buni DJ", image:"https://eventador.ro/uploads/2018/07/55a33de2-9a74-4158-a3e0-e32dc10d5203.JPG", content:"Alege cele mai dulci si bune gustari!"},
  {title: "Cum sa alegi fotograful", image:"https://eventador.ro/uploads/2021/04/1a6a6f03614c25e1789fbada2c02b869.jpg", content:"Alege cele mai dulci si bune gustari!"},
  {title: "Pasii ideali pentru a alege M.C", image:"https://eventador.ro/uploads/2019/03/94f095457342e63d920b4a04ca17d3b1.jpg", content:"Alege cele mai dulci si bune gustari!"},
  {title: "Ce vrei la dansul mirilor?", image:"https://eventador.ro/uploads/2019/10/34c2cb71dc7da5acdf5d1ed8c7f5d4e4.jpg", content:"Alege cele mai dulci si bune gustari!"},
  {title: "Cel mai mare spactacol", image:"https://eventador.ro/uploads/2018/07/Gheata-Carbonica-Fum-Greu-by-Fratii-Craciun-1@2x-50.jpg", content:"Alege cele mai dulci si bune gustari!"},
  {title: "Cum alegi un candy bar bun?", image:"https://eventador.ro/uploads/2018/07/Cofetaria-Pralina-1@2x-50.jpg", content:"Alege cele mai dulci si bune gustari!"},];
  isMobile: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {   
  }
}