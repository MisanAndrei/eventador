import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, City, County, CreateUser } from '../Models/Models';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://eventador-api.azurewebsites.net/api'; // Replace with your API endpoint

  constructor(private http: HttpClient, private authService: AuthService) { }

  getApiModel(): Observable<Category[]> {
    var token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(this.apiUrl + '/Category', { headers });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + '/Category');
  }

  getCities(countyId: number): Observable<City[]> {
    const url = `${this.apiUrl}/County/GetCitiesByCountyId/${countyId}`;
    return this.http.get<City[]>(url);
  }

  getCounties(): Observable<County[]> {
    return this.http.get<County[]>(this.apiUrl + '/County/GetAllCounties');
  }

  createUser(user: CreateUser) {
    return this.http.post<any>(this.apiUrl + 'User', user);
  }

  // Perform a GET request
  public get<T>(endpoint: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<T>(url);
  }

  // Perform a POST request
  public post<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<T>(url, data, { headers });
  }
}