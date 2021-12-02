import { prisma } from '../../prisma';

export const openAllBlastGates = async (): Promise<boolean> => {
	await prisma.blastGate.updateMany({
		data: {
			isOpen: true,
		},
	});
	return true;
};
