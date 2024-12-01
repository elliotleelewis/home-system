import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	type OnDestroy,
	type OnInit,
	inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type BlastGate, type MutationUpsertBlastGateArgs } from '@app/schema';
import { SubSink } from 'subsink';

import { ShopVacService } from '../../services/shop-vac.service';

import { BlastGateComponent } from './components/blast-gate/blast-gate.component';

@Component({
	selector: 'app-shop-vac-blast-gates',
	templateUrl: './shop-vac-blast-gates.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgClass, BlastGateComponent, FormsModule],
})
export class ShopVacBlastGatesComponent implements OnInit, OnDestroy {
	private readonly _changeDetectorRef = inject(ChangeDetectorRef);
	private readonly _shopVacService = inject(ShopVacService);

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

	ngOnInit(): void {
		this._subs.sink = this._shopVacService
			.getBlastGates()
			.subscribe((blastGates) => {
				this.blastGates = blastGates;
				this._changeDetectorRef.detectChanges();
			});
	}

	ngOnDestroy(): void {
		this._subs.unsubscribe();
	}

	toggleCreate(): void {
		this.create = !this.create;
	}

	createBlastGate(): void {
		this._subs.sink = this._shopVacService
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

	updateBlastGate({ id, name, isOpen }: BlastGate): void {
		this._subs.sink = this._shopVacService
			.upsertBlastGate({
				blastGateInput: {
					id,
					name,
					isOpen,
				},
			})
			.subscribe();
	}

	deleteBlastGate(blastGate: BlastGate): void {
		this._subs.sink = this._shopVacService
			.deleteBlastGate({ blastGateId: blastGate.id })
			.subscribe();
	}

	activateBlastGate(blastGate: BlastGate): void {
		this._subs.sink = this._shopVacService
			.activateBlastGate({ blastGateId: blastGate.id })
			.subscribe();
	}

	openAllBlastGates(): void {
		this._subs.sink = this._shopVacService.openAllBlastGates().subscribe();
	}

	closeAllBlastGates(): void {
		this._subs.sink = this._shopVacService.closeAllBlastGates().subscribe();
	}
}
