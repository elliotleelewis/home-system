import { BlastGate, QueryBlastGateArgs } from '@app/schema';

import { prisma } from '../../prisma';

export const blastGate = async (
	_: {},
	{ blastGateId }: QueryBlastGateArgs,
): Promise<BlastGate> => {
	const bg = await prisma.blastGate.findUnique({
		where: {
			id: blastGateId,
		},
	});

	if (bg === null) {
		throw new Error(`Cannot find BlastGate with id: ${blastGateId}`);
	}

	return bg;
};
