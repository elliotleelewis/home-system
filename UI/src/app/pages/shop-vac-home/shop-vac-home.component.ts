import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShopVacCreate } from '../../models/dto/shop-vac-create';
import { ShopVac } from '../../models/shop-vac';
import { ShopVacUpdateService } from '../../services/shop-vac-update.service';
import { ShopVacService } from '../../services/shop-vac.service';

@Component({
	selector: 'app-shop-vac-home',
	templateUrl: './shop-vac-home.component.html',
	styleUrls: ['./shop-vac-home.component.scss'],
})
export class ShopVacHomeComponent implements OnInit, OnDestroy {
	@ViewChild('createForm')
	createForm: NgForm;
	create = false;
	createModel: ShopVacCreate = {
		id: null,
		isOpen: false,
	};

	private _shopVacs: ShopVac[] = [];

	constructor(
		private _shopVac: ShopVacService,
		private _shopVacUpdate: ShopVacUpdateService,
	) {}

	get shopVacs(): ShopVac[] {
		return this._shopVacs;
	}

	set shopVacs(shopVacs: ShopVac[]) {
		this._shopVacs = shopVacs
			.map((shopVac) => {
				shopVac.createdAt = new Date(String(shopVac.createdAt));
				shopVac.updatedAt = new Date(String(shopVac.updatedAt));
				return shopVac;
			})
			.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
	}

	ngOnInit(): void {
		this._shopVacUpdate.start();
		this._shopVac.getAll().subscribe((shopVacs) => {
			this.shopVacs = shopVacs;
			this._shopVacUpdate.shopVacs.subscribe(
				(updatedShopVacs) => (this.shopVacs = updatedShopVacs),
			);
		});
	}

	ngOnDestroy(): void {
		this._shopVacUpdate.stop();
	}

	toggleCreate(): void {
		this.create = !this.create;
	}

	activateShopVac(shopVac: ShopVac): void {
		this._shopVac.activate(shopVac).subscribe();
	}

	updateShopVac(shopVac: ShopVac, event: Event): void {
		this._shopVac
			.update(shopVac, {
				isOpen: (event.target as HTMLInputElement).checked,
			})
			.subscribe();
	}

	createShopVac(): void {
		this._shopVac.create(this.createModel).subscribe();
		this.create = false;
		this.createForm.reset();
	}
}
