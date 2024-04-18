import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser, LoggingUserResponse } from '../Models/Models';
import { UserRole } from '../Utilities/enums/Enums';
import { Observable, catchError, first, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly secretKey: string = 'ca9f449f-173f-4de5-b50d-95ce0e08ae5d';
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private readonly userKey: string = 'loggedUser';
  private readonly favoriteProfilesKey: string = 'favoriteProfiles';
  private tokenKey = 'access_token';
  private apiUrl = 'https://eventadorapi20240303141425.azurewebsites.net/api/Auth/login';
   // Replace with your desired key for storing the token

  constructor(private http: HttpClient) { }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removeUserToken(): void {
    localStorage.removeItem(this.userKey);
  }

  removeFavoriteProfilesToken(){
    localStorage.removeItem(this.favoriteProfilesKey);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.userKey);

    if (token != null && token != undefined){
      return true;
    }
    
    return false;
    /*const token = this.getToken();
    // Check if token exists and is not expired
    return token ? !this.jwtHelper.isTokenExpired(token) : false;*/
  }

  getDecodedToken(): any {
    const token = this.getToken();
    const decodedToken = this.jwtHelper.decodeToken(token ?? "");
    var name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    var role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(name, role);
    //return token ? this.jwtHelper.decodeToken(token) : null;
  }

  login(email: string, password: string): Observable<LoggingUserResponse> {
    return this.http.post<LoggingUserResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        this.storeLoggedUser(response);
        this.storeFavoriteProfiles(response.favourtieProfilesIds ?? []);
      })
    );
  }
  
  handleLoginResponse(response: string) {
    const token = response; // Assuming the response is a token as a string
    this.storeToken(token);   
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

  getLoggedUser(): LoggedUser{
    const user = this.decodeToObject(localStorage.getItem(this.userKey) ?? "")
    return user;
  }

  updateLoggedUser(firstName: string, lastName: string, phoneNumber: string) {
    const user = this.decodeToObject(localStorage.getItem(this.userKey) ?? "")
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    localStorage.setItem(this.userKey ,this.encodeObject(user));
  }

  isUserLogged() {
    if (localStorage.getItem(this.userKey))
      return true;
    else
    return false;
  }

  getLoggedUserRole(): UserRole {
    const user = this.getLoggedUser();
    return user.role;
  }

  storeLoggedUser(x: LoggingUserResponse){
    var user =  {
      id: x.id,
      email: x.email,
      firstName: x.firstName,
      lastName: x.lastName,
      phoneNumber: x.phoneNumber,
      profilesIds: x.profilesIds,
      referralCode: x.referralCode,
      role: x.role
    } as LoggedUser

    this.handleLoginResponse(x.token);
    localStorage.setItem(this.userKey ,this.encodeObject(user));
  }

  logOut(){
    this.removeToken();
    this.removeUserToken();
    this.removeFavoriteProfilesToken()
  }

  storeFavoriteProfiles(favoriteProfiles: number[]){
    localStorage.setItem(this.favoriteProfilesKey, this.encodeObject(favoriteProfiles))
  }

  getFavoriteProfiles(){
    const favoriteProfiles = this.decodeToObject(localStorage.getItem(this.favoriteProfilesKey) ?? "")
    return favoriteProfiles as number[];
  }

  checkFavoriteProfilesKey(){
    const favoriteProfiles = localStorage.getItem(this.favoriteProfilesKey);
    if (favoriteProfiles === null) {
      // Key doesn't exist, populate it with an empty array
      this.storeFavoriteProfiles([]);
    }
  }
}