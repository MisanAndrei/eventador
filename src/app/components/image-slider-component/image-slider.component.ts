import {  NgModule, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';




@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, AfterViewInit {
  isMobile: Observable<boolean>;
  useImages: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver, private el: ElementRef) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }
  ngAfterViewInit(): void {
    const videoElement = this.el.nativeElement.querySelector('#myVideo');
    this.el.nativeElement.querySelector('#myVideo').play();
    videoElement.play();

    videoElement.addEventListener('play', () => {
      // Your code to handle the play event goes here
    });
  }

  sliderImages: string[] = [
    'assets/imagesandvideos/slider1.jpg',
    'assets/imagesandvideos/slider2.jpg',
    'assets/imagesandvideos/slider3.jpg',
    'assets/imagesandvideos/slider4.jpg',
    'assets/imagesandvideos/slider5.jpg'
  ];
  
  currentImageIndex = 0;
  
  ngOnInit(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.sliderImages.length;
    }, 5000); // Change image every 3 seconds
  }
}


