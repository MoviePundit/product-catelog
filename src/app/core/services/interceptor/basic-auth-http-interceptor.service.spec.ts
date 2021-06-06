/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasicAuthHttpInterceptorService } from './basic-auth-http-interceptor.service';

describe('Service: BasicAuthHttpInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicAuthHttpInterceptorService]
    });
  });

  it('should ...', inject([BasicAuthHttpInterceptorService], (service: BasicAuthHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
