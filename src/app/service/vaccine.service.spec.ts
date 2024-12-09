import { TestBed } from '@angular/core/testing';

import { SupplierService } from './vaccine.service';

describe('VaccineService', () => {
let service: SupplierService;

beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierService);
});

it('should be created', () => {
    expect(service).toBeTruthy();
});
});
