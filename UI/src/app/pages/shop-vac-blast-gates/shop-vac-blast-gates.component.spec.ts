import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import HubConnectionMock from '../../mocks/hub-connection.mock.spec';

import { ShopVacBlastGatesComponent } from './shop-vac-blast-gates.component';

describe('ShopVacBlastGatesComponent', () => {
	let component: ShopVacBlastGatesComponent;
	let fixture: ComponentFixture<ShopVacBlastGatesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ShopVacBlastGatesComponent],
			imports: [HttpClientTestingModule, FormsModule],
			providers: [
				{
					provide: 'HUB_CONNECTION_SHOP_VAC',
					useValue: HubConnectionMock,
				},
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
});
