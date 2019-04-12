import { Inject, Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Subject } from 'rxjs';

import { BlastGate } from '../models/shop-vac/blast-gate';

@Injectable({
	providedIn: 'root',
})
export class ShopVacHubConnectionService {
	blastGates = new Subject<BlastGate[]>();

	constructor(
		@Inject('HUB_CONNECTION_SHOP_VAC')
		private _hubConnection: HubConnection,
	) {}

	start(): void {
		this._hubConnection.start();
		this._hubConnection.on(
			'BlastGatesUpdate',
			(blastGates: BlastGate[]) => {
				this.blastGates.next(blastGates);
			},
		);
	}

	stop(): void {
		this._hubConnection.stop();
	}
}
