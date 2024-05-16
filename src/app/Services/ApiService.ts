import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './AuthService';
import { AdminDashboardProfilesChanged, ApprovalReview, Blog, Category, ChangePasswordRequest, City, County, CreateProfile, CreateUser, EditProfile, EditUserRequest, FavoriteProfilesRequest, Group, LandingPage, PartnerSupplierUser, ProfileCard, Review, SendResponse, SendReview, UserProfile } from '../Models/Models';

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
    return this.http.post<any>(`${this.apiUrl}/Category/AddOrUpdateCategory`, category).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/Blog/GetAllBlogsCards`);
  }

  getApprovalReviews(): Observable<ApprovalReview[]> {
    return this.http.get<ApprovalReview[]>(`${this.apiUrl}/Review/GetApprovalReviews`);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/Blog/${id}`);
  }

  getLandingPage(): Observable<LandingPage> {
    return this.http.get<LandingPage>(`${this.apiUrl}/Section/LandingPage`);
  }

  addBlog(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Blog`, formData).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  markCategoriesOnLandingPage(ids: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Category/MarkCategoriesToShow`, ids).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  acceptProfileChanges(profileId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Profile/ApproveProfile`, profileId).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  getReviewsByProfileId(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/Review/GetProfileReviews/${id}`);
  }

  getPartnerSuppliers(id: number): Observable<PartnerSupplierUser[]> {
    return this.http.get<PartnerSupplierUser[]>(`${this.apiUrl}/User/GetPartnerSuppliers/${id}`);
  }

  saveReview(request: SendReview): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Review/AddReview', request).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  approveOrRejectReview(reviewId: number, isApproved: boolean): Observable<any> {
    const request = { reviewId: reviewId, isApproved: isApproved };
    return this.http.post<any>(`${this.apiUrl}/Review/ApproveOrRejectReview`, request).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  saveResponse(request: SendResponse): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Review/AddResponse`, request).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/Category`);
  }

  getUnassingedCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/Category/GetUnassignedCategory`);
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

  getProfileCards(): Observable<ProfileCard[]> {
    return this.http.get<ProfileCard[]>(`${this.apiUrl}/Profile/ProfileCards`);
  }

  getProfileCardsByIds(profileIds: number[]): Observable<ProfileCard[]> {
    return this.http.get<ProfileCard[]>(this.apiUrl + '/Profile/ProfileCardsByIds', {params: {profilesIds: profileIds}});
  }

  getPartnerByReferralGuid(partnerGuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/User/GetUserByReferralGuid/${partnerGuid}`, { responseType: 'text' });
  }

  getUserProfile(id: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/Profile/ProfileById/${id}`;
    return this.http.get<UserProfile>(url);
  }

  getProfileToBeEdited(id: number): Observable<EditProfile> {
    const url = `${this.apiUrl}/Profile/EditProfileById/${id}`;
    return this.http.get<EditProfile>(url);
  }

  getProfilesWithChanges(): Observable<AdminDashboardProfilesChanged[]> {
    return this.http.get<AdminDashboardProfilesChanged[]>(`${this.apiUrl}/Profile/ProfilesToReview`);
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
    return this.http.put<any>(`${this.apiUrl}/Profile/EditProfile`, profile).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/User/ChangePassword`, changePasswordRequest);
  }

  editPersonalData(personalData: EditUserRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/User/EditUser`, personalData);
  }

  updateFavoriteProfiles(favoriteProfilesRequest: FavoriteProfilesRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/AddRemoveFavouriteProfile`, favoriteProfilesRequest).pipe(
      tap(x => {
        console.log(x);
      })
    );
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/FrogotPassword`, email).pipe(
      tap(x => {
        console.log(x);
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
}