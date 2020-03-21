import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { BlastGate } from '../models/shop-vac/blast-gate';
import { BlastGateCreate } from '../models/shop-vac/dto/blast-gate-create';
import { BlastGateUpdate } from '../models/shop-vac/dto/blast-gate-update';

@Injectable({
	providedIn: 'root',
})
export class ShopVacService {
	constructor(private http: HttpClient) {}

	getAllBlastGates(): Observable<BlastGate[]> {
		return this.http.get<BlastGate[]>(
			environment.shopVacUrl + '/api/blastgates',
		);
	}

	getBlastGate(id: string): Observable<BlastGate[]> {
		return this.http.get<BlastGate[]>(
			environment.shopVacUrl + '/api/blastgates/' + id,
		);
	}

	createBlastGate(create: BlastGateCreate): Observable<object> {
		return this.http.post(
			environment.shopVacUrl + '/api/blastgates',
			create,
		);
	}

	updateBlastGate(
		blastGate: BlastGate,
		update: BlastGateUpdate,
	): Observable<object> {
		return this.http.put(
			environment.shopVacUrl + '/api/blastgates/' + blastGate.id,
			update,
		);
	}

	deleteBlastGate(blastGate: BlastGate): Observable<object> {
		return this.http.delete(
			environment.shopVacUrl + '/api/blastgates/' + blastGate.id,
			{},
		);
	}

	activateBlastGate(blastGate: BlastGate): Observable<object> {
		return this.http.post(
			environment.shopVacUrl +
				'/api/blastgates/' +
				blastGate.id +
				'/activate',
			{},
		);
	}

	openAllBlastGates(): Observable<object> {
		return this.http.post(
			environment.shopVacUrl + '/api/blastgates/open',
			{},
		);
	}

	closeAllBlastGates(): Observable<object> {
		return this.http.post(
			environment.shopVacUrl + '/api/blastgates/close',
			{},
		);
	}
}
