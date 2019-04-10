import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ShopvacUpdateService {
	connection: HubConnection = new HubConnectionBuilder()
		.withUrl(environment.shopvacUrl + '/signalr')
		.build();

	start(): void {
		this.connection.start();
	}

	stop(): void {
		this.connection.stop();
	}
}
