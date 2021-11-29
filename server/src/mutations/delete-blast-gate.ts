import { MutationDeleteBlastGateArgs } from '../../../schema';

export const deleteBlastGate = (
	_: {},
	{ blastGateId }: MutationDeleteBlastGateArgs,
): boolean => {
	console.log(blastGateId);
	return true;
};
