/* eslint-disable @typescript-eslint/array-type,@typescript-eslint/naming-convention */
import * as Types from '../../../../node_modules/@app/schema';

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

export type BlastGateQueryVariables = Types.Exact<{
	blastGateId: Types.Scalars['ID'];
}>;

export type BlastGateQuery = {
	__typename?: 'Query';
	blastGate: {
		__typename?: 'BlastGate';
		id: string;
		name: string;
		isOpen: boolean;
	};
};

export type UpsertBlastGateMutationVariables = Types.Exact<{
	blastGateInput: Types.BlastGateInput;
}>;

export type UpsertBlastGateMutation = {
	__typename?: 'Mutation';
	upsertBlastGate: {
		__typename?: 'BlastGate';
		id: string;
		name: string;
		isOpen: boolean;
	};
};

export type DeleteBlastGateMutationVariables = Types.Exact<{
	blastGateId: Types.Scalars['ID'];
}>;

export type DeleteBlastGateMutation = {
	__typename?: 'Mutation';
	deleteBlastGate: boolean;
};

export type ActivateBlastGateMutationVariables = Types.Exact<{
	blastGateId: Types.Scalars['ID'];
}>;

export type ActivateBlastGateMutation = {
	__typename?: 'Mutation';
	activateBlastGate: boolean;
};

export type OpenAllBlastGatesMutationVariables = Types.Exact<{
	[key: string]: never;
}>;

export type OpenAllBlastGatesMutation = {
	__typename?: 'Mutation';
	openAllBlastGates: boolean;
};

export type CloseAllBlastGatesMutationVariables = Types.Exact<{
	[key: string]: never;
}>;

export type CloseAllBlastGatesMutation = {
	__typename?: 'Mutation';
	closeAllBlastGates: boolean;
};

/* eslint-enable */