import { Router } from '@angular/router';
import { AuthStorageService } from './../services/auth-storage.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authStorageService: AuthStorageService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authStorageService.getToken();

    if (token != null && token !='undefined') {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err.status);
          console.log(err.message);
          if(err.status === 401) {
            this.router.navigate(['/login']);
          } else if(err.status === 403) {
            this.router.navigate(['/forbidden']);
          }
          //return throwError(() => new Error(errorMessage))
          return throwError("Some thing is wrong");
        }
      )
    );
  }

  private addToken(request:HttpRequest<any>, token:string) {
    return request.clone(
        {
            setHeaders: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}
}
