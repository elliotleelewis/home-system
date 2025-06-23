import { mergeApplicationConfig } from '@angular/core';
import type { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';

import { APP_CONFIG } from './app.config';

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering()],
};

export const CONFIG = mergeApplicationConfig(APP_CONFIG, serverConfig);
