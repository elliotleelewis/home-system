import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocationRef {
	get location() {
		return globalThis.location;
	}
}
