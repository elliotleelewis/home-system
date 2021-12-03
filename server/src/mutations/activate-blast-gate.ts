import { MutationActivateBlastGateArgs } from '@app/schema';

import { PRISMA } from '../../prisma';

export const activateBlastGate = async (
	_: unknown,
	{ blastGateId }: MutationActivateBlastGateArgs,
): Promise<boolean> => {
	await PRISMA.$transaction([
		PRISMA.blastGate.update({
			where: {
				id: blastGateId,
			},
			data: {
				isOpen: true,
			},
		}),
		PRISMA.blastGate.updateMany({
			where: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
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
