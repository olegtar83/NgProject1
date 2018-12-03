import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let jwtHelper: JwtHelper = new JwtHelper();
    let JWT = localStorage.getItem('jwt');
    if (JWT && !jwtHelper.isTokenExpired(JWT)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JWT}`
        }
      });
    }

    return next.handle(request);
  }
}
