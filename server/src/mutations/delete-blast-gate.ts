import { type MutationDeleteBlastGateArgs } from '../../../schema';
import { PRISMA } from '../../prisma';

export const deleteBlastGate = async (
	_: unknown,
	{ blastGateId }: MutationDeleteBlastGateArgs,
): Promise<boolean> => {
	await PRISMA.blastGate.delete({
		where: {
			id: blastGateId,
		},
	});
	return true;
};
