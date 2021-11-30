import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlastGate, MutationUpsertBlastGateArgs } from '@app/schema';
import { SubSink } from 'subsink';

import { ShopVacService } from '../../services/shop-vac.service';

@Component({
	selector: 'app-shop-vac-blast-gates',
	templateUrl: './shop-vac-blast-gates.component.html',
	styleUrls: ['./shop-vac-blast-gates.component.scss'],
})
export class ShopVacBlastGatesComponent implements OnInit, OnDestroy {
	create = false;
	createModel: MutationUpsertBlastGateArgs = {
		blastGateInput: {
			id: null,
			name: '',
			isOpen: false,
		},
	};

	blastGates: BlastGate[] = [];

	private _subs = new SubSink();

	constructor(private shopVacService: ShopVacService) {}

	ngOnInit(): void {
		this._subs.sink = this.shopVacService
			.getAllBlastGates()
			.subscribe((blastGates) => (this.blastGates = blastGates));
	}

	ngOnDestroy(): void {
		this._subs.unsubscribe();
	}

	trackByBlastGatesId(_: number, blastGate: BlastGate): string {
		return blastGate.id;
	}

	toggleCreate(): void {
		this.create = !this.create;
	}

	createBlastGate(): void {
		this._subs.sink = this.shopVacService
			.upsertBlastGate(this.createModel)
			.subscribe();
		this.create = false;
		this.createModel = {
			blastGateInput: {
				id: null,
				name: '',
				isOpen: false,
			},
		};
	}

	updateBlastGate({ id, name }: BlastGate, event: Event): void {
		this._subs.sink = this.shopVacService
			.upsertBlastGate({
				blastGateInput: {
					id,
					name,
					isOpen: (event.target as HTMLInputElement).checked,
				},
			})
			.subscribe();
	}

	activateBlastGate(blastGate: BlastGate): void {
		this._subs.sink = this.shopVacService
			.activateBlastGate({ blastGateId: blastGate.id })
			.subscribe();
	}

	openAllBlastGates(): void {
		this._subs.sink = this.shopVacService.openAllBlastGates().subscribe();
	}

	closeAllBlastGates(): void {
		this._subs.sink = this.shopVacService.closeAllBlastGates().subscribe();
	}
}
