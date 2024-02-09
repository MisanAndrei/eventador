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

  ngOnInit(): void {   
  }
}


