import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

export class User {
  constructor(
    public status: string,
  ) { }

}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) { }

}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiBaseUrl: string;

  constructor(private httpClient: HttpClient,private configService: ConfigService) {
    this.apiBaseUrl = configService.getConfig().authUrl;
   }

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>(`${this.apiBaseUrl}/authenticate`, { username, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.jwttoken;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('token');
    return (user !== null) && (token !== "Bearer undefined") 
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}