import { MutationActivateBlastGateArgs } from '@app/schema';

export const activateBlastGate = (
	_: {},
	{ blastGateId: _blastGateId }: MutationActivateBlastGateArgs,
): boolean => {
	return true;
};
