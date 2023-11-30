import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, City } from '../Models/Models';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://eventadorapitest.azurewebsites.net/api'; // Replace with your API endpoint

  constructor(private http: HttpClient, private authService: AuthService) { }

  getApiModelModel(): Observable<Category[]> {
    var token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(this.apiUrl + 'Category', { headers });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'Category');
  }

  getCities(countyId: number): Observable<City[]> {
    return this.http.post<City[]>(this.apiUrl + 'City', countyId);
  }
}