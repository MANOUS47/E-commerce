import { TestBed } from '@angular/core/testing';
import { ProServiceService } from './pro-service.service';

describe('ProServiceService', () => {
  let service: ProServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
