import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { CONFIG } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, CONFIG);

export default bootstrap;
