import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { FavoriteProfilesServiceComponent } from 'src/app/Services/FavoriteProfilesService';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {


  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {

  }
}