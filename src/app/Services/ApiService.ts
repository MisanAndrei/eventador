import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AdminDashboardProfilesChanged, ApprovalReview, Blog, Category, ChangePasswordRequest, City, County, CreateProfile, CreateUser, EditProfile, EditUser, EditUserRequest, FavoriteProfilesRequest, LandingPage, ProfileCard, Review, SendResponse, SendReview, UserProfile } from '../Models/Models';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://eventadorapi20240303141425.azurewebsites.net/api';

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

  getApprovalReviews(): Observable<ApprovalReview[]>{
    return this.http.get<ApprovalReview[]>(this.apiUrl + '/Review/GetApprovalReviews')
  }

  getBlogById(id: number): Observable<Blog>{
    return this.http.get<Blog>(`${this.apiUrl}/Blog/${id}`);
  }

  getLandingPage(): Observable<LandingPage>{
    return this.http.get<LandingPage>(this.apiUrl + '/Section/LandingPage');
  }

  addBlog(formData: FormData): void {
    this.http.post<any>(this.apiUrl + '/Blog', formData).subscribe(x => {
      console.log(x);
    });
}

  markCategoriesOnLandingPage(ids: number[]){
    this.http.post<any>(this.apiUrl + '/Category/MarkCategoriesToShow', ids).subscribe(x => {
      console.log(x);
    });
  }

  acceptProfileChanges(profileId: number){
    this.http.post<any>(this.apiUrl + '/Profile/ApproveProfile', profileId).subscribe(x => {
      console.log(x);
    });
  }

  getReviewsByProfileId(id: number): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiUrl}/Review/GetProfileReviews/${id}`);
  }

  saveReview(request: SendReview){
    this.http.post<any>(this.apiUrl + '/Review/AddReview', request).subscribe(x => {
      console.log(x);
    });
  }

  approveOrRejectReview(reviewId: number, isApproved: boolean){
    const request = {
      reviewId: reviewId,
      isApproved: isApproved
    } as any
    this.http.post<any>(this.apiUrl + '/Review/ApproveOrRejectReview', request).subscribe(x => {
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

  getProfileToReview(profileId: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/Profile/ProfilesToReview/${profileId}`;
    return this.http.get<UserProfile>(url);
  }

  getCounties(): Observable<County[]> {
    return this.http.get<County[]>(this.apiUrl + '/County/GetAllCounties');
  }

  getProfileCards(): Observable<ProfileCard[]>{
    return this.http.get<ProfileCard[]>(this.apiUrl + '/Profile/ProfileCards')
  }

  getProfileCardsByIds(profileIds: number[]): Observable<ProfileCard[]> {
    let params = new HttpParams();
    return this.http.get<ProfileCard[]>(this.apiUrl + '/Profile/ProfileCardsByIds', {params: {profilesIds: profileIds}});
  }

  getPartnerByReferralGuid(partnerGuid: string){
    return this.http.get(this.apiUrl + '/User/GetUserByReferralGuid' + '/' + partnerGuid, { responseType: 'text' })
      .pipe(
        catchError(error => {
          // Handle the error here
          console.error('Error:', error);
          return "e";
        })
      );
  }

  getUserProfile(id: number): Observable<UserProfile>{
    const url = `${this.apiUrl}/Profile/ProfileById/${id}`;
    return this.http.get<UserProfile>(url);
  }

  getProfileToBeEdited(id: number): Observable<EditProfile>{
    const url = `${this.apiUrl}/Profile/EditProfileById/${id}`;
    return this.http.get<EditProfile>(url);
  }

  getProfilesWithChanges(): Observable<AdminDashboardProfilesChanged[]> {
    return this.http.get<AdminDashboardProfilesChanged[]>(this.apiUrl + '/Profile/ProfilesToReview');
  }

  createUser(user: CreateUser) {
    var test = this.http.post<any>(this.apiUrl + '/User', user);
    test.subscribe(x => {
      console.log(x);
    })
    console.log(test);
    return test;
  }

  addProfile(userId: number, profile: CreateProfile){
    const url = `${this.apiUrl}/Profile/EditProfile/${userId}`;
    var test = this.http.put<any>(url, profile);
    test.subscribe(x => {
      console.log(x);
    })
    console.log(test);
    return test;
  }

  editProfile(profile: EditProfile) {
    var test = this.http.put<any>(this.apiUrl + '/Profile/EditProfile', profile);
    test.subscribe(x => {
      console.log(x);
    })
    console.log(test);
    return test;
  }

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any> {
    return this.http.put( this.apiUrl + '/User/ChangePassword', changePasswordRequest);
  }

  editPersonalData(personalData: EditUserRequest){
    return this.http.put( this.apiUrl + '/User/EditUser', personalData);
  }

  updateFavoriteProfiles(favoriteProfilesRequest: FavoriteProfilesRequest){
    this.http.post<any>(this.apiUrl + '/User/AddRemoveFavouriteProfile', favoriteProfilesRequest).subscribe(x => {
      console.log(x);
    });
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