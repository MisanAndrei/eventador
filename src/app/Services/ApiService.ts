import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './AuthService';
import { AdminDashboardProfilesChanged, ApprovalReview, Blog, Category, ChangePasswordRequest, City, County, CreateProfile, CreateUser, EditProfile, EditUserRequest, FavoriteProfilesRequest, Group, LandingPage, PartnerSupplierUser, ProfileCard, ReferralResponse, Review, SendResponse, SendReview, UserDetails, UserProfile } from '../Models/Models';
import { CustomersRequest, UpsertBlogRequest, UpsertMainCategoryRequest } from '../Requests/Requests';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://eventadorapi20240303141425.azurewebsites.net/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getApiModel(): Observable<Category[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(`${this.apiUrl}/Category`, { headers });
  }

  upsertCategory(category: Category): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Category/AddOrUpdateCategory`, category, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  upsertCategoryGroup(request: UpsertMainCategoryRequest): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Category/AddOrUpdateCategoryGroup`, request, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/Blog/GetAllBlogsCards`);
  }

  getApprovalReviews(): Observable<ApprovalReview[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ApprovalReview[]>(`${this.apiUrl}/Review/GetApprovalReviews`, {headers});
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/Blog/${id}`);
  }

  getLandingPage(): Observable<LandingPage> {
    return this.http.get<LandingPage>(`${this.apiUrl}/Section/LandingPage`);
  }

  upsertBlog(request: UpsertBlogRequest): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Blog`, request, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  markCategoriesOnLandingPage(ids: number[]): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Category/MarkCategoriesToShow`, ids, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  acceptProfileChanges(profileId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Profile/ApproveProfile`, profileId, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  rejectProfileChanges(profileId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Profile/RejectProfile`, profileId, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  getReviewsByProfileId(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/Review/GetProfileReviews/${id}`);
  }

  getPartnerSuppliers(id: number): Observable<PartnerSupplierUser[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PartnerSupplierUser[]>(`${this.apiUrl}/User/GetPartnerSuppliers/${id}`, {headers});
  }

  getUserDetails(id: number): Observable<UserDetails>{
    return this.http.get<UserDetails>(`${this.apiUrl}/User/GetUserDetails/${id}`);
  }

  saveReview(request: SendReview): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl + '/Review/AddReview', request, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  approveOrRejectReview(reviewId: number, isApproved: boolean): Observable<any> {
    const request = { reviewId: reviewId, isApproved: isApproved };
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Review/ApproveOrRejectReview`, request, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  saveResponse(request: SendResponse): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Review/AddResponse`, request, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/Category`);
  }

  getUnassingedCategories(): Observable<Category[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(`${this.apiUrl}/Category/GetUnassignedCategories`, {headers});
  }

  getMainCategories(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/Category/CategoryGroups`)
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
    return this.http.get<County[]>(`${this.apiUrl}/County/GetAllCounties`);
  }

  getProfileCards(request: CustomersRequest): Observable<ProfileCard[]> {
    return this.http.post<ProfileCard[]>(`${this.apiUrl}/Profile/ProfileCards`, request).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  getProfileCardsByIds(profileIds: number[]): Observable<ProfileCard[]> {
    return this.http.get<ProfileCard[]>(this.apiUrl + '/Profile/ProfileCardsByIds', {params: {profilesIds: profileIds}});
  }

  getPartnerByReferralGuid(partnerGuid: string): Observable<ReferralResponse> {
    return this.http.get<ReferralResponse>(`${this.apiUrl}/User/GetUserByReferralGuid/${partnerGuid}`);
  }

  getUserProfile(id: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/Profile/ProfileById/${id}`;
    return this.http.get<UserProfile>(url);
  }

  getProfileToBeEdited(id: number): Observable<EditProfile> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/Profile/EditProfileById/${id}`;
    return this.http.get<EditProfile>(url, {headers});
  }

  getProfilesWithChanges(): Observable<AdminDashboardProfilesChanged[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AdminDashboardProfilesChanged[]>(`${this.apiUrl}/Profile/ProfilesToReview`, {headers});
  }

  activateAccount(activationToken: string): Observable<any>{
    return this.http.get<number>(`${this.apiUrl}/auth/ActivateAccount`, { params: { activationToken } });
  }

  createUser(user: CreateUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User`, user).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  addProfile(userId: number, profile: CreateProfile): Observable<any> {
    const url = `${this.apiUrl}/Profile/EditProfile/${userId}`;
    return this.http.put<any>(url, profile).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  editProfile(profile: EditProfile): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/Profile/EditProfile`, profile, { headers }).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/User/ChangePassword`, changePasswordRequest, {headers});
  }

  editPersonalData(personalData: EditUserRequest): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/User/EditUser`, personalData, {headers});
  }

  updateFavoriteProfiles(favoriteProfilesRequest: FavoriteProfilesRequest): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/User/AddRemoveFavouriteProfile`, favoriteProfilesRequest, {headers}).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/ForgotPassword`, email).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    const options = {
      body: userId // Pass the raw integer as the body
    };
  
    return this.http.request<any>('DELETE', `${this.apiUrl}/User/DeleteUser`, options).pipe(
      tap(response => {
        console.log('User deleted successfully:', response);
      })
    );
  }

  deleteProfile(profileId: number): Observable<any> {
    const options = {
      body: { userId: profileId }
    };
  
    return this.http.request<any>('DELETE', `${this.apiUrl}/User/DeleteUser`, options).pipe(
      tap(response => {
        console.log('Profile deleted successfully:', response);
      })
    );
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

  public checkEmailUnique(email: string){
    return this.http.get<any>(`${this.apiUrl}/User/IsEmailUnique`, { params: { email } });
  }
}