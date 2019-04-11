import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShopvacCreate } from '../../models/dto/shopvac-create';
import { Shopvac } from '../../models/shopvac';
import { ShopvacUpdateService } from '../../services/shopvac-update.service';
import { ShopvacService } from '../../services/shopvac.service';

@Component({
	selector: 'app-shopvac-home',
	templateUrl: './shopvac-home.component.html',
	styleUrls: ['./shopvac-home.component.scss'],
})
export class ShopvacHomeComponent implements OnInit, OnDestroy {
	@ViewChild('createForm')
	createForm: NgForm;
	create = false;
	createModel: ShopvacCreate = {
		id: null,
		isOpen: false,
	};

	private _shopvacs: Shopvac[] = [];

	constructor(
		private _shopvac: ShopvacService,
		private _shopvacUpdate: ShopvacUpdateService,
	) {}

	get shopvacs(): Shopvac[] {
		return this._shopvacs;
	}

	set shopvacs(shopvacs: Shopvac[]) {
		this._shopvacs = shopvacs
			.map((shopvac) => {
				shopvac.createdAt = new Date(String(shopvac.createdAt));
				shopvac.updatedAt = new Date(String(shopvac.updatedAt));
				return shopvac;
			})
			.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
	}

	ngOnInit(): void {
		this._shopvacUpdate.start();
		this._shopvac.getAll().subscribe((shopvacs) => {
			this.shopvacs = shopvacs;
			this._shopvacUpdate.shopvacs.subscribe(
				(updatedShopvacs) => (this.shopvacs = updatedShopvacs),
			);
		});
	}

	ngOnDestroy(): void {
		this._shopvacUpdate.stop();
	}

	toggleCreate(): void {
		this.create = !this.create;
	}

	activateShopvac(shopvac: Shopvac): void {
		this._shopvac.activate(shopvac).subscribe();
	}

	updateShopvac(shopvac: Shopvac, event: Event): void {
		this._shopvac
			.update(shopvac, {
				isOpen: (event.target as HTMLInputElement).checked,
			})
			.subscribe();
	}

	createShopvac(): void {
		this._shopvac.create(this.createModel).subscribe();
		this.create = false;
		this.createForm.reset();
	}
}
