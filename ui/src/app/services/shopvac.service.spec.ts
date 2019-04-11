import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ShopvacService } from './shopvac.service';

describe('ShopvacService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}),
	);

	it('should be created', () => {
		const service: ShopvacService = TestBed.get(ShopvacService);
		expect(service).toBeTruthy();
	});
});
