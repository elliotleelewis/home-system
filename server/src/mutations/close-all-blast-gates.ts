import { PRISMA } from '../../prisma';

export const closeAllBlastGates = async (): Promise<boolean> => {
	await PRISMA.blastGate.updateMany({
		data: {
			isOpen: false,
		},
	});
	return true;
};
