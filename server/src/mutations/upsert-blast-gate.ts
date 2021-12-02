import { v4 as uuid } from 'uuid';

import { BlastGate, MutationUpsertBlastGateArgs } from '../../../schema';
import { prisma } from '../../prisma';

export const upsertBlastGate = async (
	_: {},
	{ blastGateInput }: MutationUpsertBlastGateArgs,
): Promise<BlastGate> => {
	return await prisma.blastGate.upsert({
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
};
