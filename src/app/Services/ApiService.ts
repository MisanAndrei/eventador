import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, Category, City, County, CreateUser, LandingPage, ProfileCard, SendResponse, SendReview, UserProfile } from '../Models/Models';
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

  upsertCategory(category: Category) {
    this.http.post<any>(this.apiUrl + '/Category/AddOrUpdateCategory', category).subscribe(x => {
      console.log(x);
    });
  }

  getBlogs(): Observable<Blog[]>{
    return this.http.get<Blog[]>(this.apiUrl + '/Blog/GetAllBlogsCards');
  }

  getBlogById(id: number): Observable<Blog>{
    return this.http.get<Blog>(`${this.apiUrl}/Blog/${id}`);
  }

  getLandingPage(): Observable<LandingPage>{
    return this.http.get<LandingPage>(this.apiUrl + '/Section/LandingPage');
  }

  addBlog(blog: Blog){
    this.http.post<any>(this.apiUrl + '/Blog', blog).subscribe(x => {
      console.log(x);
    });
  }

  markCategoriesOnLandingPage(ids: number[]){
    this.http.post<any>(this.apiUrl + '/Category/MarkCategoriesToShow', ids).subscribe(x => {
      console.log(x);
    });
  }

  saveReview(request: SendReview){
    this.http.post<any>(this.apiUrl + '/Review/AddReview', request).subscribe(x => {
      console.log(x);
    });
  }

  saveResponse(request: SendResponse){
    this.http.post<any>(this.apiUrl + '/Review/AddResponse', request).subscribe(x => {
      console.log(x);
    });
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

  getProfileCards(): Observable<ProfileCard[]>{
    return this.http.get<ProfileCard[]>(this.apiUrl + '/Profile/ProfileCards')
  }

  getUserProfile(id: number): Observable<UserProfile>{
    const url = `${this.apiUrl}/Profile/ProfileById/${id}`;
    return this.http.get<UserProfile>(url);
  }

  createUser(user: CreateUser) {
    var test = this.http.post<any>(this.apiUrl + '/User', user);
    test.subscribe(x => {
      console.log(x);
    })
    console.log(test);
    return test;
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