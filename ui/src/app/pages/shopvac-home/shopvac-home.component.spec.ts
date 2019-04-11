import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HubConnection } from '@aspnet/signalr';

import HubConnectionMock from '../../mocks/hub-connection.mock.spec';

import { ShopvacHomeComponent } from './shopvac-home.component';

describe('ShopvacHomeComponent', () => {
	let component: ShopvacHomeComponent;
	let fixture: ComponentFixture<ShopvacHomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ShopvacHomeComponent],
			imports: [HttpClientTestingModule, FormsModule],
			providers: [
				{ provide: HubConnection, useValue: HubConnectionMock },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ShopvacHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
