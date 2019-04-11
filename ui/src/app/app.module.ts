import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopvacHomeComponent } from './pages/shopvac-home/shopvac-home.component';

library.add(fas);

@NgModule({
	declarations: [AppComponent, HomeComponent, ShopvacHomeComponent],
	imports: [
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
		FontAwesomeModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
