import { type ComponentFixture } from '@angular/core/testing';
import { MockBuilder, MockRender } from 'ng-mocks';

import { BlastGateComponent } from './blast-gate.component';

describe('BlastGateComponent', () => {
	let component: BlastGateComponent;
	let fixture: ComponentFixture<BlastGateComponent>;

	beforeEach(() => {
		return MockBuilder(BlastGateComponent);
	});

	beforeEach(() => {
		const params: Partial<BlastGateComponent> = {
			blastGate: {
				id: '12345',
				name: 'Test',
				isOpen: true,
			},
		};
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
