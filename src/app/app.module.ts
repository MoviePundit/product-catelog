import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './core/services/config/config.service';
import { BasicAuthHttpInterceptorService } from './core/services/interceptor/basic-auth-http-interceptor.service';
import { HttpErrorInterceptorService } from './core/services/interceptor/http-error-interceptor.service';
import { LoginComponent } from './features/login/login.component';
import { LogoutComponent } from './features/logout/logout.component';
import { TableFilterPipe } from './core/pipes/filter.pipe';
import { ProductsComponent } from './features/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    LogoutComponent,
    TableFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
