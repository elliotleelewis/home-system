import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { ShopVacBlastGatesComponent } from './shop-vac-blast-gates.component';

describe('ShopVacBlastGatesComponent', () => {
	let component: ShopVacBlastGatesComponent;
	let fixture: ComponentFixture<ShopVacBlastGatesComponent>;

	beforeEach(
		waitForAsync(() => {
			void TestBed.configureTestingModule({
				declarations: [ShopVacBlastGatesComponent],
				imports: [ApolloTestingModule, FormsModule],
			}).compileComponents();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ShopVacBlastGatesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
