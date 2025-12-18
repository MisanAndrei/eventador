import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../Services/ApiService';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const profileInfo: string = route.params['profileId'];
    const match = profileInfo.match(/^(.*)-(\d+)$/);
    const idPart = match ? match[2] : profileInfo;
    return this.apiService.getUserProfile(+idPart);
  }
}
