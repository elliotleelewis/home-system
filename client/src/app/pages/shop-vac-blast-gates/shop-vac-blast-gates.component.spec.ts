import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';

import { ShopVacService } from '../../services/shop-vac.service';

import { BlastGateComponent } from './components/blast-gate/blast-gate.component';
import { ShopVacBlastGatesComponent } from './shop-vac-blast-gates.component';

describe('ShopVacBlastGatesComponent', () => {
	let component: ShopVacBlastGatesComponent;
	let fixture: ComponentFixture<ShopVacBlastGatesComponent>;

	let mockShopVacService: Partial<ShopVacService>;

	beforeEach(waitForAsync(() => {
		mockShopVacService = {
			getBlastGates: jest.fn(() =>
				of([
					{
						id: '12345',
						name: 'Test',
						isOpen: true,
					},
				]),
			),
		};

		void TestBed.configureTestingModule({
			declarations: [
				ShopVacBlastGatesComponent,
				MockComponents(BlastGateComponent),
			],
			imports: [FormsModule],
			providers: [
				{ provide: ShopVacService, useValue: mockShopVacService },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ShopVacBlastGatesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render', () => {
		expect(fixture).toMatchSnapshot();
	});
});
