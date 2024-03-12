import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteProfilesServiceComponent {

  private apiUrl = 'https://your-api-url.com'; // Replace this with your API endpoint

  constructor(private http: HttpClient) { }

  updateFavoriteProfiles(profileIds: number[]) {
    // Call the API endpoint to update favorite profiles
    return this.http.post<any>(`${this.apiUrl}/update-favorite-profiles`, { profileIds });
  }
}