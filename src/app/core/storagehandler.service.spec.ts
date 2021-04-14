import { TestBed } from '@angular/core/testing';

import { StoragehandlerService } from './storagehandler.service';

describe('StoragehandlerService', () => {
  let service: StoragehandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragehandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
