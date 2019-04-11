import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ShopVacService } from './shop-vac.service';

describe('ShopVacService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}),
	);

	it('should be created', () => {
		const service: ShopVacService = TestBed.get(ShopVacService);
		expect(service).toBeTruthy();
	});
});
