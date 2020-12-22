import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { BlastGate } from '../../models/shop-vac/blast-gate';
import { BlastGateCreate } from '../../models/shop-vac/dto/blast-gate-create';
import { ShopVacHubConnectionService } from '../../services/shop-vac-hub-connection.service';
import { ShopVacService } from '../../services/shop-vac.service';

@Component({
	selector: 'app-shop-vac-blast-gates',
	templateUrl: './shop-vac-blast-gates.component.html',
	styleUrls: ['./shop-vac-blast-gates.component.scss'],
})
export class ShopVacBlastGatesComponent implements OnInit, OnDestroy {
	create = false;
	createModel: BlastGateCreate = {
		id: '',
		isOpen: false,
	};

	private _blastGates: BlastGate[] = [];
	private subs = new SubSink();

	constructor(
		private shopVacService: ShopVacService,
		private shopVacHubConnectionService: ShopVacHubConnectionService,
	) {}

	get blastGates(): BlastGate[] {
		return this._blastGates;
	}

	set blastGates(blastGates: BlastGate[]) {
		this._blastGates = blastGates
			.map((blastGate) => {
				blastGate.createdAt = new Date(String(blastGate.createdAt));
				blastGate.updatedAt = new Date(String(blastGate.updatedAt));
				return blastGate;
			})
			.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
	}

	ngOnInit(): void {
		this.subs.sink = this.shopVacHubConnectionService
			.start()
			.pipe(
				switchMap(() =>
					merge(
						this.shopVacService.getAllBlastGates(),
						this.shopVacHubConnectionService.blastGates,
					),
				),
			)
			.subscribe((blastGates) => (this.blastGates = blastGates));
	}

	ngOnDestroy(): void {
		this.subs.sink = this.shopVacHubConnectionService
			.stop()
			.subscribe(() => this.subs.unsubscribe());
	}

	toggleCreate(): void {
		this.create = !this.create;
	}

	createBlastGate(): void {
		this.subs.sink = this.shopVacService
			.createBlastGate(this.createModel)
			.subscribe();
		this.create = false;
		this.createModel = {
			id: '',
			isOpen: false,
		};
	}

	updateBlastGate(blastGate: BlastGate, event: Event): void {
		this.subs.sink = this.shopVacService
			.updateBlastGate(blastGate, {
				isOpen: (event.target as HTMLInputElement).checked,
			})
			.subscribe();
	}

	activateBlastGate(blastGate: BlastGate): void {
		this.subs.sink = this.shopVacService
			.activateBlastGate(blastGate)
			.subscribe();
	}

	openAllBlastGates(): void {
		this.subs.sink = this.shopVacService.openAllBlastGates().subscribe();
	}

	closeAllBlastGates(): void {
		this.subs.sink = this.shopVacService.closeAllBlastGates().subscribe();
	}
}
