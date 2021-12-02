import { prisma } from '../../prisma';

export const closeAllBlastGates = async (): Promise<boolean> => {
	await prisma.blastGate.updateMany({
		data: {
			isOpen: false,
		},
	});
	return true;
};
