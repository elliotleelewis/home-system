import { BlastGate, QueryBlastGateArgs } from '@app/schema';

export const blastGate = (
	_: {},
	{ blastGateId }: QueryBlastGateArgs,
): BlastGate => {
	return {
		id: blastGateId,
		name: 'Test 1',
		isOpen: true,
	};
};
