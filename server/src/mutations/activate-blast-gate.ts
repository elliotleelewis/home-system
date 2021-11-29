import { BlastGate, MutationActivateBlastGateArgs } from '@app/schema';

export const activateBlastGate = (
	_: {},
	{ blastGateId }: MutationActivateBlastGateArgs,
): BlastGate => {
	return {
		id: blastGateId,
		name: 'Test 1',
		isOpen: true,
	};
};
