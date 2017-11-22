import { TestBed, inject } from '@angular/core/testing';

import { SwiffyService } from './swiffy.service';

describe('SwiffyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwiffyService]
    });
  });

  it('should be created', inject([SwiffyService], (service: SwiffyService) => {
    expect(service).toBeTruthy();
  }));
});
