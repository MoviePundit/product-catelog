/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';


/**
 * This service class loads configuration details.
 * application start up in app module.
 */
@Injectable()
export class ConfigService {
  private configuration: any;

  constructor(private http: HttpClient) {
    this.configuration = environment;
  }
  /**
   * method return configuration loaded fron env specific config and default to environment
   */
  public getConfig(): any {
    return this.configuration;
  }
  /**
   * method return baseurl loaded fron env specific config and default to environment
   */
  public getBaseUrl(): string {
    return this.configuration.apiBaseUrl;
  }
  
}
