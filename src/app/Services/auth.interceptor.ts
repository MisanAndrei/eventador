import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './AuthService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Attach the Bearer token to the request
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized: Try refreshing the token and retry the request
          return this.authService.RefreshTokens().pipe(
            switchMap(() => {
              // Clone the original request with the new token
              const newToken = this.authService.getToken();
              const clonedRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });

              // Retry the request
              return next.handle(clonedRequest);
            }),
            catchError(refreshError => {
              // If refresh also fails, log the user out
              this.authService.logOut();
              return throwError(() => refreshError);
            })
          );
        }
        else if (error.status == 403){
            this.authService.logOut();
        }

        // For other errors, just pass them through
        return throwError(() => error);
      })
    );
  }
}