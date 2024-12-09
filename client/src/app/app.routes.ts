import { type Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ShopVacBlastGatesComponent } from './pages/shop-vac-blast-gates/shop-vac-blast-gates.component';

export const ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'shop-vac/blast-gates',
		component: ShopVacBlastGatesComponent,
	},
];
