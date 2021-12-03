import { PRISMA } from '../../prisma';

export const openAllBlastGates = async (): Promise<boolean> => {
	await PRISMA.blastGate.updateMany({
		data: {
			isOpen: true,
		},
	});
	return true;
};
