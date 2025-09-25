import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
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

  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.playActiveVideo();
    this.videoPlayers.changes.subscribe(() => this.playActiveVideo());
  }

  private playActiveVideo(): void {
    const video = this.videoPlayers.first?.nativeElement;
    if (video) {
      video.muted = true; // required for autoplay everywhere
      video.setAttribute('playsinline', 'true'); // iOS Safari fix
      video.play().catch(err => {
        console.warn('Autoplay blocked or interrupted:', err);
      });
    }
  }
}
