import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from "@angular/router";
import { MustMatch } from '../helpers/must-match.validator';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private rest: HttpService, private router: Router) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let credentials = this.registerForm.value;
      this.rest.post("auth/register", credentials).subscribe(response => {
        let token = (<any>response).token;
        let name = (<any>response).name;
        localStorage.setItem("jwt", token);
        this.router.navigate(["/"]);
      }, err => {
      });

    alert('SUCCESS!! :-)')
  }

}
