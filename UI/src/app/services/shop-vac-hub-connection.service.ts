import { Inject, Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { from, Observable, Subject } from 'rxjs';

import { BlastGate } from '../models/shop-vac/blast-gate';

@Injectable({
	providedIn: 'root',
})
export class ShopVacHubConnectionService {
	private _blastGates = new Subject<BlastGate[]>();

	constructor(
		@Inject('HUB_CONNECTION_SHOP_VAC')
		private hubConnection: HubConnection,
	) {}

	get blastGates(): Observable<BlastGate[]> {
		return this._blastGates.asObservable();
	}

	start(): Observable<void> {
		this.hubConnection.on('BlastGatesUpdate', (blastGates: BlastGate[]) => {
			this._blastGates.next(blastGates);
		});
		return from(this.hubConnection.start());
	}

	stop(): Observable<void> {
		return from(this.hubConnection.stop());
	}
}
