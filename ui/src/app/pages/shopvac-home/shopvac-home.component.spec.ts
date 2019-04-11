import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopvacHomeComponent } from './shopvac-home.component';

describe('ShopvacHomeComponent', () => {
	let component: ShopvacHomeComponent;
	let fixture: ComponentFixture<ShopvacHomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ShopvacHomeComponent],
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
