import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HubConnectionBuilder } from '@aspnet/signalr';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopVacBlastGatesComponent } from './pages/shop-vac-blast-gates/shop-vac-blast-gates.component';

@NgModule({
	declarations: [AppComponent, HomeComponent, ShopVacBlastGatesComponent],
	imports: [
		HttpClientModule,
		FormsModule,
		BrowserModule,
		RouterModule.forRoot(
			[
				{ path: '', component: HomeComponent },
				{
					path: 'shop-vac/blast-gates',
					component: ShopVacBlastGatesComponent,
				},
			],
			{
				useHash: true,
			},
		),
	],
	providers: [
		{
			provide: 'HUB_CONNECTION_SHOP_VAC',
			useFactory: () =>
				new HubConnectionBuilder()
					.withUrl(environment.shopVacUrl + '/signalr')
					.build(),
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
