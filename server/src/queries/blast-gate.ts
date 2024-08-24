import { type BlastGate, type QueryBlastGateArgs } from '@app/schema';

import { PRISMA } from '../../prisma';

export const blastGate = async (
	_: unknown,
	{ blastGateId }: QueryBlastGateArgs,
): Promise<BlastGate> => {
	const bg = await PRISMA.blastGate.findUnique({
		where: {
			id: blastGateId,
		},
	});

	if (bg === null) {
		throw new Error(`Cannot find BlastGate with id: ${blastGateId}`);
	}

	return bg;
};
