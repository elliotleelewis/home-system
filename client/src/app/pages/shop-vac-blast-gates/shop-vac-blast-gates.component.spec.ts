import type { ComponentFixture } from '@angular/core/testing';
import { MockBuilder, MockRender } from 'ng-mocks';
import { of } from 'rxjs';

import { ShopVacService } from '../../services/shop-vac.service';

import { ShopVacBlastGatesComponent } from './shop-vac-blast-gates.component';

describe('ShopVacBlastGatesComponent', () => {
	let component: ShopVacBlastGatesComponent;
	let fixture: ComponentFixture<ShopVacBlastGatesComponent>;

	let mockShopVacService: Partial<ShopVacService>;

	beforeEach(() => {
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

		return MockBuilder(ShopVacBlastGatesComponent).provide({
			provide: ShopVacService,
			useValue: mockShopVacService,
		});
	});

	beforeEach(() => {
		fixture = MockRender(ShopVacBlastGatesComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render', () => {
		expect(fixture).toMatchSnapshot();
	});
});
