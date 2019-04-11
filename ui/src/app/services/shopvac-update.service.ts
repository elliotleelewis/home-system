import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Subject } from 'rxjs';

import { Shopvac } from '../models/shopvac';

@Injectable({
	providedIn: 'root',
})
export class ShopvacUpdateService {
	shopvacs = new Subject<Shopvac[]>();

	constructor(private _hubConnection: HubConnection) {}

	start(): void {
		this._hubConnection.start();
		this._hubConnection.on('Update', (shopvacs: Shopvac[]) => {
			this.shopvacs.next(shopvacs);
		});
	}

	stop(): void {
		this._hubConnection.stop();
	}
}
