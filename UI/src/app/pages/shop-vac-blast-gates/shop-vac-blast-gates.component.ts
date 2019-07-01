import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
	@ViewChild('createForm', { static: false })
	createForm: NgForm;
	create = false;
	createModel: BlastGateCreate = {
		id: '',
		isOpen: false,
	};

	private _blastGates: BlastGate[] = [];

	constructor(
		private _shopVac: ShopVacService,
		private _shopVacUpdate: ShopVacHubConnectionService,
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
		this._shopVacUpdate.start();
		this._shopVac.getAllBlastGates().subscribe((blastGates) => {
			this.blastGates = blastGates;
			this._shopVacUpdate.blastGates.subscribe(
				(updatedBlastGates) => (this.blastGates = updatedBlastGates),
			);
		});
	}

	ngOnDestroy(): void {
		this._shopVacUpdate.stop();
	}

	toggleCreate(): void {
		this.create = !this.create;
	}

	createBlastGate(): void {
		this._shopVac.createBlastGate(this.createModel).subscribe();
		this.create = false;
		this.createModel = {
			id: '',
			isOpen: false,
		};
	}

	updateBlastGate(blastGate: BlastGate, event: Event): void {
		this._shopVac
			.updateBlastGate(blastGate, {
				isOpen: (event.target as HTMLInputElement).checked,
			})
			.subscribe();
	}

	activateBlastGate(blastGate: BlastGate): void {
		this._shopVac.activateBlastGate(blastGate).subscribe();
	}

	openAllBlastGates(): void {
		this._shopVac.openAllBlastGates().subscribe();
	}

	closeAllBlastGates(): void {
		this._shopVac.closeAllBlastGates().subscribe();
	}
}
