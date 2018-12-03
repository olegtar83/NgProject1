import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
  export class AuthGuardService implements CanActivate {
  constructor( private router: Router) {
  }
  canActivate() {
    let token = localStorage.getItem("jwt");
    let jwtHelper: JwtHelper = new JwtHelper();
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

}
