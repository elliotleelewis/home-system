import { MutationDeleteBlastGateArgs } from '../../../schema';
import { prisma } from '../../prisma';

export const deleteBlastGate = async (
	_: {},
	{ blastGateId }: MutationDeleteBlastGateArgs,
): Promise<boolean> => {
	await prisma.blastGate.delete({
		where: {
			id: blastGateId,
		},
	});
	return true;
};
