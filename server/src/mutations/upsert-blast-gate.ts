import { v4 as uuid } from 'uuid';

import { BlastGate, MutationUpsertBlastGateArgs } from '../../../schema';

export const upsertBlastGate = (
	_: {},
	{ blastGateInput }: MutationUpsertBlastGateArgs,
): BlastGate => {
	return {
		...blastGateInput,
		id: blastGateInput.id ?? uuid(),
	};
};
