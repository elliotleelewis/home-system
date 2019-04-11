import { TestBed } from '@angular/core/testing';
import { HubConnection } from '@aspnet/signalr';

import HubConnectionMock from '../mocks/hub-connection.mock.spec';

import { ShopVacUpdateService } from './shop-vac-update.service';

describe('ShopVacUpdateService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{ provide: HubConnection, useValue: HubConnectionMock },
			],
		}),
	);

	it('should be created', () => {
		const service: ShopVacUpdateService = TestBed.get(ShopVacUpdateService);
		expect(service).toBeTruthy();
	});
});
