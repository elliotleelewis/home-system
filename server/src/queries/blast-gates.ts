import { BlastGate } from '@app/schema';
import { v4 as uuid } from 'uuid';

export const blastGates = (): BlastGate[] => {
	return [
		{
			id: uuid(),
			name: 'Test 1',
			isOpen: true,
		},
	];
};
