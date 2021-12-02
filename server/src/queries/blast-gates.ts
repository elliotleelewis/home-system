import { BlastGate } from '@app/schema';

import { PRISMA } from '../../prisma';

export const blastGates = async (): Promise<BlastGate[]> =>
	PRISMA.blastGate.findMany({
		orderBy: {
			createdAt: 'asc',
		},
	});
