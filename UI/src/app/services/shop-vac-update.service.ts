import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Subject } from 'rxjs';

import { ShopVac } from '../models/shop-vac';

@Injectable({
	providedIn: 'root',
})
export class ShopVacUpdateService {
	shopVacs = new Subject<ShopVac[]>();

	constructor(private _hubConnection: HubConnection) {}

	start(): void {
		this._hubConnection.start();
		this._hubConnection.on('Update', (shopVacs: ShopVac[]) => {
			this.shopVacs.next(shopVacs);
		});
	}

	stop(): void {
		this._hubConnection.stop();
	}
}
