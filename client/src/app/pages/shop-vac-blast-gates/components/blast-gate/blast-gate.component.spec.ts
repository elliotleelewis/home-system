import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BlastGateComponent } from './blast-gate.component';

describe('BlastGateComponent', () => {
	let component: BlastGateComponent;
	let fixture: ComponentFixture<BlastGateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BlastGateComponent],
			imports: [FormsModule],
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

	it('should render', () => {
		expect(fixture).toMatchSnapshot();
	});
});
