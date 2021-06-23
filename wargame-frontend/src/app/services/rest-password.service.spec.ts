import { TestBed } from '@angular/core/testing';

import { RestPasswordService } from './rest-password.service';

describe('RestPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestPasswordService = TestBed.get(RestPasswordService);
    expect(service).toBeTruthy();
  });
});
