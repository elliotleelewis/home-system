import { Component, OnDestroy, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
	connection: HubConnection = new HubConnectionBuilder()
		.withUrl(environment.shopvacUrl + '/signalr')
		.build();

	ngOnDestroy(): void {
		this.connection.stop();
	}

	ngOnInit(): void {
		this.connection.start();
	}
}
