import { type BlastGate } from '@app/schema';

import { PRISMA } from '../../prisma';
import { blastGates } from '../queries';

export const openAllBlastGates = async (): Promise<BlastGate[]> => {
	await PRISMA.blastGate.updateMany({
		data: {
			isOpen: true,
		},
	});
	return blastGates();
};
