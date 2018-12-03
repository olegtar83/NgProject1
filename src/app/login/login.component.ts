import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  invalidLogin: boolean;
  constructor(private router: Router, private rest: HttpService) { }
  login(form: NgForm) {
    let credentials = form.value;
    this.rest.post("auth/login", credentials).subscribe(response => {
      let token = (<any>response).token;
      let name = (<any>response).name;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
 
}
