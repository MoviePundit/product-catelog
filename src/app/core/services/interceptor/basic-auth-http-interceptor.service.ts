import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {

      const token = sessionStorage.getItem('token');
      req = req.clone({

        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token !== null ? token : 'no token'
        })
      })
    }

    return next.handle(req);
  }
}