import { TestBed } from '@angular/core/testing';

import HubConnectionMock from '../mocks/hub-connection.mock.spec';

import { ShopVacHubConnectionService } from './shop-vac-hub-connection.service';

describe('ShopVacHubConnectionService', () => {
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
		const service: ShopVacHubConnectionService = TestBed.get(
			ShopVacHubConnectionService,
		);
		expect(service).toBeTruthy();
	});
});
