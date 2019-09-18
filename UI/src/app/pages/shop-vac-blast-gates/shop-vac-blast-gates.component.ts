import { Component, OnDestroy, OnInit } from '@angular/core';

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

	private gates: BlastGate[] = [];

	constructor(
		private shopVacService: ShopVacService,
		private shopVacHubConnectionService: ShopVacHubConnectionService,
	) {}

	get blastGates(): BlastGate[] {
		return this.gates;
	}

	set blastGates(blastGates: BlastGate[]) {
		this.gates = blastGates
			.map((blastGate) => {
				blastGate.createdAt = new Date(String(blastGate.createdAt));
				blastGate.updatedAt = new Date(String(blastGate.updatedAt));
				return blastGate;
			})
			.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
	}

	ngOnInit(): void {
		this.shopVacHubConnectionService.start();
		this.shopVacService.getAllBlastGates().subscribe((blastGates) => {
			this.blastGates = blastGates;
			this.shopVacHubConnectionService.blastGates.subscribe(
				(updatedBlastGates) => (this.blastGates = updatedBlastGates),
			);
		});
	}

	ngOnDestroy(): void {
		this.shopVacHubConnectionService.stop();
	}

	toggleCreate(): void {
		this.create = !this.create;
	}

	createBlastGate(): void {
		this.shopVacService.createBlastGate(this.createModel).subscribe();
		this.create = false;
		this.createModel = {
			id: '',
			isOpen: false,
		};
	}

	updateBlastGate(blastGate: BlastGate, event: Event): void {
		this.shopVacService
			.updateBlastGate(blastGate, {
				isOpen: (event.target as HTMLInputElement).checked,
			})
			.subscribe();
	}

	activateBlastGate(blastGate: BlastGate): void {
		this.shopVacService.activateBlastGate(blastGate).subscribe();
	}

	openAllBlastGates(): void {
		this.shopVacService.openAllBlastGates().subscribe();
	}

	closeAllBlastGates(): void {
		this.shopVacService.closeAllBlastGates().subscribe();
	}
}
