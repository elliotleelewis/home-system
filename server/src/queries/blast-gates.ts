import { BlastGate } from '@app/schema';

import { prisma } from '../../prisma';

export const blastGates = async (): Promise<BlastGate[]> => {
	return prisma.blastGate.findMany({
		orderBy: {
			createdAt: 'asc',
		},
	});
};
