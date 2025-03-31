import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './AuthService';
import { ApiService } from './ApiService';
import { FavoriteProfilesRequest } from '../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteProfilesServiceComponent {

  private apiUrl = 'https://your-api-url.com'; // Replace this with your API endpoint

  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiService) { }

  updateFavoriteProfiles() {
    if (this.authService.isAuthenticated()){
      const user = this.authService.getLoggedUser();
      const favoriteProfiles = this.authService.getFavoriteProfiles();
      const favoriteProfilesRequest = {
        userId: user.id,
        profileIds: favoriteProfiles
      } as FavoriteProfilesRequest
      this.apiService.updateFavoriteProfiles(favoriteProfilesRequest).subscribe({
        next: () => {

        },
        error: (error) => {
          console.error('Error saving review:', error);
          // Handle error
        }
      });
    }
  }

  loadFavoriteProfiles() {
    return this.authService.getFavoriteProfiles();
  }

  saveFavoriteProfiles(profileIds: number[]){
    this.authService.storeFavoriteProfiles(profileIds);
  }

  addProfileToFavorite(profileId: number){
    let favoriteProfiles = this.loadFavoriteProfiles() as number[];
    if (!favoriteProfiles.includes(profileId)) {
      favoriteProfiles.push(profileId);
      this.saveFavoriteProfiles(favoriteProfiles);
    }

    if (this.authService.isAuthenticated()){
      let user = this.authService.getLoggedUser();
      const favoriteProfilesRequest = {
        userId: user.id,
        profileIds: favoriteProfiles
    } as FavoriteProfilesRequest

    this.apiService.updateFavoriteProfiles(favoriteProfilesRequest);
    }
  }

  removeProfileFromFavorite(profileId: number){
    let favoriteProfiles = this.loadFavoriteProfiles() as number[];
    let index = favoriteProfiles.indexOf(profileId);
    if (index !== -1) {
      favoriteProfiles.splice(index, 1);
      this.saveFavoriteProfiles(favoriteProfiles);
    }

    if (this.authService.isAuthenticated()){
      let user = this.authService.getLoggedUser();
      const favoriteProfilesRequest = {
        userId: user.id,
        profileIds: favoriteProfiles
    } as FavoriteProfilesRequest

    this.apiService.updateFavoriteProfiles(favoriteProfilesRequest);
    }
  }

  clearFavoriteProfiles(favoriteProfileIds: number[]){
    let favoriteProfiles = favoriteProfileIds;
    this.saveFavoriteProfiles(favoriteProfiles);
  }
}