import { provideHttpClient } from '@angular/common/http';
import { inject, provideZoneChangeDetection } from '@angular/core';
import type { ApplicationConfig } from '@angular/core';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { ENVIRONMENT } from '../environments/environment';

import { ROUTES } from './app.routes';

export const APP_CONFIG: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideApollo(() => {
			const httpLink = inject(HttpLink);
			return {
				cache: new InMemoryCache(),
				link: httpLink.create({
					uri: `${ENVIRONMENT.serverUrl}/graphql`,
				}),
				devtools: {
					enabled: !ENVIRONMENT.production,
				},
			};
		}),
		provideHttpClient(),
		provideRouter(ROUTES),
		provideClientHydration(withEventReplay()),
	],
};
