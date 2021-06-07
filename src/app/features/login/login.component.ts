import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false
  loading = {text:"Login",disable:false}
  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin(username:string,password:string) {
    this.loading.text = "loading...."
    this.loading.disable=true;
    this.invalidLogin = false
    this.loginservice.authenticate(username, password).subscribe(
      data => {
        this.loading.text = "Login";
        this.loading.disable=false;
        this.invalidLogin = false
        this.router.navigate([''])
      },
      error => {
        this.invalidLogin = true
        this.loading.text = "Login";
        this.loading.disable=false;
      }
    )
    
  }
}