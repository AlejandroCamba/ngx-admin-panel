import { TestBed } from '@angular/core/testing';

import { MultipleInstanceService } from './multiple-instance.service';

describe('MultipleInstanceService', () => {
  let service: MultipleInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
