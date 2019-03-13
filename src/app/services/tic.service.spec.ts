import { TestBed } from '@angular/core/testing';

import { TicService } from './tic.service';

describe('TicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicService = TestBed.get(TicService);
    expect(service).toBeTruthy();
  });
});
