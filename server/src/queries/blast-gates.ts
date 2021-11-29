import { BlastGate } from '@app/schema';

export const blastGates = (): BlastGate[] => {
	return [
		{
			id: '12345',
			name: 'Test 1',
			isOpen: true,
		},
	];
};
