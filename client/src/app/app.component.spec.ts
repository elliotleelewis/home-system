import type { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockBuilder, MockRender } from 'ng-mocks';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(() => {
		return MockBuilder(AppComponent).provide(provideRouter([]));
	});

	beforeEach(() => {
		fixture = MockRender(AppComponent);
		component = fixture.componentInstance;
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});

	it('should render', () => {
		expect(fixture).toMatchSnapshot();
	});
});
