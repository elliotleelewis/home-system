import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { ShopVacService } from './shop-vac.service';

describe('ShopVacService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [ApolloTestingModule],
		}),
	);

	it('should be created', () => {
		const service: ShopVacService = TestBed.inject(ShopVacService);

		expect(service).toBeTruthy();
	});
});
