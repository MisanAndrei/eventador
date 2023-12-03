import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { ProfileCard, Section } from "src/app/Models/Models";

@Component({
    selector: 'app-popular-customers-tab',
    templateUrl: './popular-customers-tab.component.html',
    styleUrls: ['./popular-customers-tab.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })

  export class PopularCustomersTabComponent implements OnInit {
    @Input() cards?: ProfileCard[];
    @Input() section?: Section;

    constructor(){

    }
  ngOnInit(): void {
    console.log("aiciiiiiiii");
    console.log(this.cards);
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