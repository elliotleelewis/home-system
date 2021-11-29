import { BlastGate, MutationUpsertBlastGateArgs } from '../../../schema';

export const upsertBlastGate = (
	_: {},
	{ blastGateInput }: MutationUpsertBlastGateArgs,
): BlastGate => {
	return {
		...blastGateInput,
		id: blastGateInput.id ?? '12345',
	};
};
