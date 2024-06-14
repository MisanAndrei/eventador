import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private popularFonts: string[] = [
    'Arial',
    'Arial Black',
    'Baskerville',
    'Book Antiqua',
    'Brush Script MT',
    'Calibri',
    'Calisto MT',
    'Cambria',
    'Candara',
    'Century Gothic',
    'Comic Sans MS',
    'Consolas',
    'Courier New',
    'Franklin Gothic Medium',
    'Futura',
    'Garamond',
    'Geneva',
    'Georgia',
    'Gill Sans',
    'Helvetica',
    'Hoefler Text',
    'Impact',
    'Lucida Sans',
    'Optima',
    'Palatino Linotype',
    'Rockwell',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana'
  ];

  constructor() {}

  getPopularFonts(): string[] {
    return this.popularFonts;
  }
}