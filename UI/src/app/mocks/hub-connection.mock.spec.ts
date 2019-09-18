import { HubConnection } from '@aspnet/signalr';
import { Subject } from 'rxjs';

const mock = jasmine.createSpyObj<HubConnection>('HubConnectionMock', [
	'start',
	'stop',
	'on',
]);

export const watching: {
	[key: string]: Subject<any>;
} = {};

mock.start.and.callFake(() => {
	console.log('SignalR - STARTED');
});
mock.stop.and.callFake(() => {
	console.log('SignalR - STOPPED');
});
mock.on.and.callFake((methodName: string, newMethod: (...args) => {}) => {
	console.log(`SignalR - WATCHING ${methodName}`);
	const subject = new Subject<any>();
	subject.subscribe(newMethod);
	watching[methodName] = subject;
});

export default mock;
