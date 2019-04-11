import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopvacHomeComponent } from './pages/shopvac-home/shopvac-home.component';

@NgModule({
	declarations: [AppComponent, HomeComponent, ShopvacHomeComponent],
	imports: [
		HttpClientModule,
		FormsModule,
		BrowserModule,
		RouterModule.forRoot(
			[
				{ path: '', component: HomeComponent },
				{ path: 'shopvac', component: ShopvacHomeComponent },
			],
			{
				useHash: true,
			},
		),
	],
	providers: [
		{
			provide: HubConnection,
			useFactory: () =>
				new HubConnectionBuilder()
					.withUrl(environment.shopvacUrl + '/signalr')
					.build(),
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
