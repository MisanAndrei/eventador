import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser, LoggingUserResponse, LoginResponse } from '../Models/Models';
import { UserRole } from '../Utilities/enums/Enums';
import { Observable, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly secretKey: string = 'ca9f449f-173f-4de5-b50d-95ce0e08ae5d';
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private readonly userKey: string = 'loggedUser';
  private readonly favoriteProfilesKey: string = 'favoriteProfiles';
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private apiUrl = 'https://eventadorapi20240303141425.azurewebsites.net/api/Auth/login';
  private refreshUrl = 'https://eventadorapi20240303141425.azurewebsites.net/api/Auth/refresh';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Token and refresh token in cookies
  storeToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, { path: '/', secure: true, sameSite: 'Strict' });
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
  }

  storeRefreshToken(refreshToken: string): void {
    this.cookieService.set(this.refreshTokenKey, refreshToken, { path: '/', secure: true, sameSite: 'Strict' });
  }

  getRefreshToken(): string | null {
    return this.cookieService.get(this.refreshTokenKey);
  }

  removeRefreshToken(): void {
    this.cookieService.delete(this.refreshTokenKey, '/');
  }

  // Other data in local storage
  storeLoggedUser(x: LoggingUserResponse): void {
    const user = {
      id: x.id,
      email: x.email,
      firstName: x.firstName,
      lastName: x.lastName,
      phoneNumber: x.phoneNumber,
      profilesIds: x.profilesIds,
      referralCode: x.referralCode,
      role: x.role
    } as LoggedUser;

    this.handleLoginResponse(x.token);
    this.storeRefreshToken(x.refreshToken); // Assuming the response contains a refresh token
    localStorage.setItem(this.userKey, this.encodeObject(user));
  }

  removeUserToken(): void {
    localStorage.removeItem(this.userKey);
  }

  removeFavoriteProfilesToken(): void {
    localStorage.removeItem(this.favoriteProfilesKey);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get(this.tokenKey);
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getDecodedToken(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const platform: string = "Web";
    return this.http.post<LoginResponse>(this.apiUrl, { email, password, platform }).pipe(
      tap(response => {
        
      })
    );
  }

  handleLoginResponse(response: string): void {
    this.storeToken(response); // Assuming the response is a token
  }

  encodeObject(objectToEncode: any): string {
    const jsonString = JSON.stringify(objectToEncode);
    const encodedString = btoa(jsonString + this.secretKey);
    return encodedString;
  }

  decodeToObject(encodedString: string): any {
    const decodedString = atob(encodedString);
    const jsonString = decodedString.slice(0, -this.secretKey.length);
    return JSON.parse(jsonString);
  }

  getLoggedUser(): LoggedUser {
    const user = this.decodeToObject(localStorage.getItem(this.userKey) ?? "");
    return user;
  }

  updateLoggedUser(firstName: string, lastName: string, phoneNumber: string): void {
    const user = this.decodeToObject(localStorage.getItem(this.userKey) ?? "");
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    localStorage.setItem(this.userKey, this.encodeObject(user));
  }

  isUserLogged(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  getLoggedUserRole(): UserRole {
    const user = this.getLoggedUser();
    return user.role;
  }

  logOut(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUserToken();
    this.removeFavoriteProfilesToken();
  }

  storeFavoriteProfiles(favoriteProfiles: number[]): void {
    localStorage.setItem(this.favoriteProfilesKey, this.encodeObject(favoriteProfiles));
  }

  getFavoriteProfiles(): number[] {
    const favoriteProfiles = this.decodeToObject(localStorage.getItem(this.favoriteProfilesKey) ?? "");
    return favoriteProfiles as number[];
  }

  checkFavoriteProfilesKey(): void {
    const favoriteProfiles = localStorage.getItem(this.favoriteProfilesKey);
    if (!favoriteProfiles) {
      this.storeFavoriteProfiles([]);
    }
  }

  // Check if the refresh token is valid, and if not, refresh tokens
  checkAndRefreshTokens(): Observable<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken || this.jwtHelper.isTokenExpired(refreshToken)) {
      return this.refreshTokens(refreshToken).pipe(
        tap(response => {
          this.storeToken(response.token);
          this.storeRefreshToken(response.refreshToken);
        }),
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
    }
    return of(false);
  }

  refreshTokens(refreshToken: string | null): Observable<{ token: string, refreshToken: string }> {
    return this.http.post<{ token: string, refreshToken: string }>(this.refreshUrl, { refreshToken });
  }
}