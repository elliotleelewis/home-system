import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastGateComponent } from './blast-gate.component';

describe('BlastGateComponent', () => {
	let component: BlastGateComponent;
	let fixture: ComponentFixture<BlastGateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BlastGateComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BlastGateComponent);
		component = fixture.componentInstance;

		component.blastGate = {
			id: '12345',
			name: 'Test',
			isOpen: true,
		};

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
