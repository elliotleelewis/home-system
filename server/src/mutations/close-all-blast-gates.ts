import { type BlastGate } from '@app/schema';

import { PRISMA } from '../../prisma';
import { blastGates } from '../queries';

export const closeAllBlastGates = async (): Promise<BlastGate[]> => {
	await PRISMA.blastGate.updateMany({
		data: {
			isOpen: false,
		},
	});
	return blastGates();
};
