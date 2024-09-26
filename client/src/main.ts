import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ShopVacBlastGatesComponent } from './app/pages/shop-vac-blast-gates/shop-vac-blast-gates.component';
import { ENVIRONMENT } from './environments/environment';

if (ENVIRONMENT.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule, FormsModule),
		provideApollo(() => {
			const httpLink = inject(HttpLink);
			return {
				cache: new InMemoryCache(),
				link: httpLink.create({
					uri: `${ENVIRONMENT.serverUrl}/graphql`,
				}),
				connectToDevTools: !ENVIRONMENT.production,
			};
		}),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(
			[
				{ path: '', component: HomeComponent },
				{
					path: 'shop-vac/blast-gates',
					component: ShopVacBlastGatesComponent,
				},
			],
			withHashLocation(),
		),
	],
}).catch((error: unknown) => {
	console.error(error);
});
