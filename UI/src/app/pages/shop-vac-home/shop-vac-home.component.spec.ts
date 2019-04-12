import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import HubConnectionMock from '../../mocks/hub-connection.mock.spec';

import { ShopVacHomeComponent } from './shop-vac-home.component';

describe('ShopVacHomeComponent', () => {
	let component: ShopVacHomeComponent;
	let fixture: ComponentFixture<ShopVacHomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ShopVacHomeComponent],
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
		fixture = TestBed.createComponent(ShopVacHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
