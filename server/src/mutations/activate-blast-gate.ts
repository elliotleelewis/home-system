import { MutationActivateBlastGateArgs } from '@app/schema';

import { prisma } from '../../prisma';

export const activateBlastGate = async (
	_: {},
	{ blastGateId }: MutationActivateBlastGateArgs,
): Promise<boolean> => {
	await prisma.$transaction([
		prisma.blastGate.update({
			where: {
				id: blastGateId,
			},
			data: {
				isOpen: true,
			},
		}),
		prisma.blastGate.updateMany({
			where: {
				NOT: {
					id: blastGateId,
				},
			},
			data: {
				isOpen: false,
			},
		}),
	]);
	return true;
};
