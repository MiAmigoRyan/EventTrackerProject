import { TestBed } from '@angular/core/testing';

import { ColorthemeService } from './colortheme.service';

describe('ColorthemeService', () => {
  let service: ColorthemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorthemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
