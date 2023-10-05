import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-enlarged-view',
  templateUrl: './image-enlarged-view.component.html',
  styleUrls: ['./image-enlarged-view.component.css']
})
export class ImageEnlargedViewComponent {
  @Input() images: string[] = [];
  @Input() selectedImageIndex: number = 0;
  @Output() closeEnlargedView: EventEmitter<void> = new EventEmitter<void>();

  constructor(){

  }

  
}