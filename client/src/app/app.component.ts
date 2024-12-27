import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { type LocationRef } from './refs/location.ref';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, RouterLinkActive, RouterOutlet],
})
export class AppComponent {
	constructor(private locationRef: LocationRef) {}

	get homebridgeUrl() {
		const url = new URL(this.locationRef.location.origin);
		url.port = '8581';
		return url.toString();
	}
}
