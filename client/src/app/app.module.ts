import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { ENVIRONMENT } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BlastGateComponent } from './pages/shop-vac-blast-gates/components/blast-gate/blast-gate.component';
import { ShopVacBlastGatesComponent } from './pages/shop-vac-blast-gates/shop-vac-blast-gates.component';

@NgModule({
	declarations: [
		AppComponent,
		BlastGateComponent,
		HomeComponent,
		ShopVacBlastGatesComponent,
	],
	bootstrap: [AppComponent],
	imports: [
		ApolloModule,
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
		FormsModule,
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
		provideHttpClient(withInterceptorsFromDi()),
	],
})
export class AppModule {}
