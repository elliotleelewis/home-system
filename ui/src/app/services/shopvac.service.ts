import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ShopvacCreate } from '../models/dto/shopvac-create';
import { ShopvacUpdate } from '../models/dto/shopvac-update';
import { Shopvac } from '../models/shopvac';

@Injectable({
	providedIn: 'root',
})
export class ShopvacService {
	constructor(private _http: HttpClient) {}

	getAll(): Observable<Shopvac[]> {
		return this._http.get<Shopvac[]>(
			environment.shopvacUrl + '/api/shopvac',
		);
	}

	create(create: ShopvacCreate): Observable<Object> {
		return this._http.post(environment.shopvacUrl + '/api/shopvac', create);
	}

	update(shopvac: Shopvac, update: ShopvacUpdate): Observable<Object> {
		return this._http.put(
			environment.shopvacUrl + '/api/shopvac/' + shopvac.id,
			update,
		);
	}

	activate(shopvac: Shopvac): Observable<Object> {
		return this._http.post(
			environment.shopvacUrl + '/api/shopvac/' + shopvac.id + '/activate',
			{},
		);
	}
}
