import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LocationRef } from '../refs/location.ref';

@Component({
	selector: 'app-menu',
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './menu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
	private readonly _locationRef = inject(LocationRef);

	get homebridgeUrl() {
		const url = new URL(this._locationRef.location.origin);
		url.port = '8581';
		return url.toString();
	}
}
