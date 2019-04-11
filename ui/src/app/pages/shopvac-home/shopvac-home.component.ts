import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShopvacUpdateService } from '../../services/shopvac-update.service';

@Component({
	selector: 'app-shopvac-home',
	templateUrl: './shopvac-home.component.html',
	styleUrls: ['./shopvac-home.component.scss'],
})
export class ShopvacHomeComponent implements OnInit, OnDestroy {
	constructor(private _shopvacUpdate: ShopvacUpdateService) {}

	ngOnInit(): void {
		this._shopvacUpdate.start();
	}

	ngOnDestroy(): void {
		this._shopvacUpdate.stop();
	}
}
