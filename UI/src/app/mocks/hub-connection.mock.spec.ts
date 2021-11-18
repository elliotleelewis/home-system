import { HubConnection } from '@microsoft/signalr';
import { Subject } from 'rxjs';

const MOCK = jasmine.createSpyObj<HubConnection>('HubConnectionMock', [
	'start',
	'stop',
	'on',
]);

export const WATCHING: {
	[key: string]: Subject<unknown>;
} = {};

MOCK.start.and.callFake(() => {
	console.log('SignalR - STARTED');
	return Promise.resolve();
});
MOCK.stop.and.callFake(() => {
	console.log('SignalR - STOPPED');
	return Promise.resolve();
});
MOCK.on.and.callFake(
	(methodName: string, newMethod: (...args: unknown[]) => void) => {
		console.log(`SignalR - WATCHING ${methodName}`);
		const subject = new Subject<unknown>();
		subject.subscribe(newMethod);
		WATCHING[methodName] = subject;
	},
);

export default MOCK;
