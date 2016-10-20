/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimalsService } from './animals-service.service';

describe('Service: AnimalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalsService]
    });
  });

  it('should ...', inject([AnimalsService], (service: AnimalsService) => {
    expect(service).toBeTruthy();
  }));
});
