import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InMemoryCache } from '@apollo/client';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { ENVIRONMENT } from '../environments/environment';

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
			provide: APOLLO_OPTIONS,
			useFactory: (httpLink: HttpLink) => ({
				cache: new InMemoryCache(),
				link: httpLink.create({
					uri: `${ENVIRONMENT.serverUrl}/graphql`,
				}),
				connectToDevTools: !ENVIRONMENT.production,
			}),
			deps: [HttpLink],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
