import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { MockBuilder, MockRender } from 'ng-mocks';

import { ShopVacService } from './shop-vac.service';

describe('ShopVacService', () => {
	beforeEach(() => {
		return MockBuilder(ShopVacService).provide(
			provideApollo(() => ({ cache: new InMemoryCache() })),
		);
	});

	it('should be created', () => {
		const service = MockRender(ShopVacService).point.componentInstance;

		expect(service).toBeTruthy();
	});
});
