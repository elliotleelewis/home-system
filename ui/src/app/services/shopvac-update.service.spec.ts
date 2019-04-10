import { TestBed } from '@angular/core/testing';

import { ShopvacUpdateService } from './shopvac-update.service';

describe('ShopvacUpdateService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ShopvacUpdateService = TestBed.get(ShopvacUpdateService);
		expect(service).toBeTruthy();
	});
});
