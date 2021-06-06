/* eslint-disable @typescript-eslint/unbound-method */
import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { throwError } from 'rxjs';

import { ConfigService, configFactory } from './config.service';
import { environment } from '@environments/environment';

describe('ConfigService', () => {
  let service: ConfigService;
  let http: HttpClient;
  const result = { apiBaseUrl: 'http://domain-name.com/api/v1' };

  beforeEach(() => {
    void TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: jest.fn() } },
        ConfigService
      ]
    });
    service = TestBed.inject(ConfigService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("'loadConfig' should load configuration'", fakeAsync(() => {
    const expected = cold('-a|', { a: result });
    http.get = jest.fn(() => expected);
    void service.loadConfig();
    expect(http.get).toHaveBeenCalledWith('../../../../../assets/config.json');
  }));

  it('configFactory should be created', () => {
    const expected = cold('-a|', { a: result });
    http.get = jest.fn(() => expected);
    expect(configFactory(service)).toBeTruthy();
    void configFactory(service)().then(() =>
      expect(service.getConfig()).toEqual(result)
    );
  });

  it("'loadConfig' should have default to environment configuration when error comes'", fakeAsync(() => {
    http.get = jest.fn(() => {
      return throwError(new Error(' testing purpose only throwing error'));
    });
    void service.loadConfig();
    expect(http.get).toHaveBeenCalledWith('../../../../../assets/config.json');
    expect(service.getConfig()).toEqual(environment);
  }));
});
