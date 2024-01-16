import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser, LoggingUserResponse } from '../Models/Models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly secretKey: string = 'ca9f449f-173f-4de5-b50d-95ce0e08ae5d';
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private readonly userKey: string = 'loggedUser';
  private tokenKey = 'access_token';
  private apiUrl = 'https://eventador-api-dev.azurewebsites.net/api/Auth/login';
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

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check if token exists and is not expired
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getDecodedToken(): any {
    const token = this.getToken();
    const decodedToken = this.jwtHelper.decodeToken(token ?? "");
    var name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    var role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(name, role);
    //return token ? this.jwtHelper.decodeToken(token) : null;
  }

  login(email: string, password: string): boolean {
    try {
      const response1 = this.http.post<LoggingUserResponse>(this.apiUrl, { email, password });

      response1.subscribe(x => {
        var user =  {
          id: x.id,
          email: x.email,
          firstName: x.firstName,
          lastName: x.lastName,
          phoneNumber: x.phoneNumber,
          profileId: x.profileId,
          role: x.role
        } as LoggedUser

        var response = this.handleLoginResponse(x.token);

        if (!response){
          return false;
        }

        localStorage.setItem(this.userKey ,this.encodeObject(user));
        
        return true;
      })
      return false;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }
  
  handleLoginResponse(response: string): boolean {
    const token = response; // Assuming the response is a token as a string
    if (token) {
      this.storeToken(token);
      this.getDecodedToken();
      console.log('Login successful');
      return true;
    } else {
      console.error('Invalid response from API');
      return false;
    }
  }

  encodeObject(objectToEncode: any): string {
    const jsonString = JSON.stringify(objectToEncode);
    const encodedString = btoa(jsonString + this.secretKey);
    return encodedString;
  }

  decodeToObject(encodedString: string): LoggedUser {
    const decodedString = atob(encodedString);
    const jsonString = decodedString.slice(0, -this.secretKey.length);
    return JSON.parse(jsonString);
  }

  getLoggedUser(): LoggedUser{
    const user = this.decodeToObject(localStorage.getItem(this.userKey) ?? "")
    return user;
  }

  isUserLogged() {
    if (localStorage.getItem(this.userKey))
      return true;
    else
    return false;
  }

}