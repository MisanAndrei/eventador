import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../Services/AuthService';
import { FavoriteProfilesServiceComponent } from 'src/app/Services/FavoriteProfilesService';
import { ApiService } from 'src/app/Services/ApiService';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {


  constructor(private authService: AuthService, private favoriteProfilesService: FavoriteProfilesServiceComponent, private apiService: ApiService) {
    
  }

  ngOnInit(): void {
    if (this.authService.isUserLogged()){
      let userId = this.authService.getLoggedUser().id;
      this.apiService.getFavoriteProfiles(userId).subscribe(favoriteUsersDb => {
        this.favoriteProfilesService.clearFavoriteProfiles(favoriteUsersDb);
      })
    }
  }
}