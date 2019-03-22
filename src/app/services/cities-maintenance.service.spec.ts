import { TestBed } from '@angular/core/testing';

import { CitiesMaintenanceService } from './cities-maintenance.service';

describe('CitiesMaintenanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitiesMaintenanceService = TestBed.get(CitiesMaintenanceService);
    expect(service).toBeTruthy();
  });
});
