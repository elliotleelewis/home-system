import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class HomeComponent {}
