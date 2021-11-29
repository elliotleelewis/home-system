/* eslint-disable @typescript-eslint/array-type,@typescript-eslint/naming-convention */
import * as Types from '../../../../../node_modules/@app/schema';

export type BlastGatesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type BlastGatesQuery = {
	__typename?: 'Query';
	blastGates: Array<{
		__typename?: 'BlastGate';
		id: string;
		name: string;
		isOpen: boolean;
	}>;
};

/* eslint-enable */
