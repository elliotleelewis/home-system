import { BlastGate, MutationUpsertBlastGateArgs } from '@app/schema';
import { v4 as uuid } from 'uuid';

import { PRISMA } from '../../prisma';

export const upsertBlastGate = async (
	_: unknown,
	{ blastGateInput }: MutationUpsertBlastGateArgs,
): Promise<BlastGate> =>
	await PRISMA.blastGate.upsert({
		create: {
			name: blastGateInput.name,
			isOpen: blastGateInput.isOpen,
		},
		update: {
			name: blastGateInput.name,
			isOpen: blastGateInput.isOpen,
		},
		where: {
			id: blastGateInput.id ?? uuid(),
		},
	});
