import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ShopVacCreate } from '../models/dto/shop-vac-create';
import { ShopVacUpdate } from '../models/dto/shop-vac-update';
import { ShopVac } from '../models/shop-vac';

@Injectable({
	providedIn: 'root',
})
export class ShopVacService {
	constructor(private _http: HttpClient) {}

	getAll(): Observable<ShopVac[]> {
		return this._http.get<ShopVac[]>(
			environment.shopVacUrl + '/api/shopvac',
		);
	}

	create(create: ShopVacCreate): Observable<Object> {
		return this._http.post(environment.shopVacUrl + '/api/shopvac', create);
	}

	update(shopVac: ShopVac, update: ShopVacUpdate): Observable<Object> {
		return this._http.put(
			environment.shopVacUrl + '/api/shopvac/' + shopVac.id,
			update,
		);
	}

	activate(shopVac: ShopVac): Observable<Object> {
		return this._http.post(
			environment.shopVacUrl + '/api/shopvac/' + shopVac.id + '/activate',
			{},
		);
	}
}
