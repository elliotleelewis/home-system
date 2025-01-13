import { input } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import type { BlastGate } from '@app/schema';
import { MockBuilder, MockRender } from 'ng-mocks';

import { BlastGateComponent } from './blast-gate.component';

// TODO - Re-enable once signals are supported by `ng-mocks`
describe.skip('BlastGateComponent', () => {
	let component: BlastGateComponent;
	let fixture: ComponentFixture<BlastGateComponent>;

	beforeEach(() => {
		return MockBuilder(BlastGateComponent);
	});

	beforeEach(() => {
		const params = {
			blastGate: input<BlastGate>({
				id: '12345',
				name: 'Test',
				isOpen: true,
			}),
		} as const satisfies Partial<BlastGateComponent>;
		fixture = MockRender(BlastGateComponent, params as BlastGateComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render', () => {
		expect(fixture).toMatchSnapshot();
	});
});
