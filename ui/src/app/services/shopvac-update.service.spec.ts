import { TestBed } from '@angular/core/testing';
import { HubConnection } from '@aspnet/signalr';

import HubConnectionMock from '../mocks/hub-connection.mock.spec';

import { ShopvacUpdateService } from './shopvac-update.service';

describe('ShopvacUpdateService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{ provide: HubConnection, useValue: HubConnectionMock },
			],
		}),
	);

	it('should be created', () => {
		const service: ShopvacUpdateService = TestBed.get(ShopvacUpdateService);
		expect(service).toBeTruthy();
	});
});
