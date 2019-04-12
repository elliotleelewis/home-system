import { TestBed } from '@angular/core/testing';

import HubConnectionMock from '../mocks/hub-connection.mock.spec';

import { ShopVacUpdateService } from './shop-vac-update.service';

describe('ShopVacUpdateService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'HUB_CONNECTION_SHOP_VAC',
					useValue: HubConnectionMock,
				},
			],
		}),
	);

	it('should be created', () => {
		const service: ShopVacUpdateService = TestBed.get(ShopVacUpdateService);
		expect(service).toBeTruthy();
	});
});
