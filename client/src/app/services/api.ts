import { gql } from 'apollo-angular';

export const BLAST_GATES = gql`
	query BlastGates {
		blastGates {
			id
			name
			isOpen
		}
	}
`;

export const BLAST_GATE = gql`
	query BlastGate($blastGateId: ID!) {
		blastGate(blastGateId: $blastGateId) {
			id
			name
			isOpen
		}
	}
`;

export const UPSERT_BLAST_GATE = gql`
	mutation UpsertBlastGate($blastGateInput: BlastGateInput!) {
		upsertBlastGate(blastGateInput: $blastGateInput) {
			id
			name
			isOpen
		}
	}
`;

export const DELETE_BLAST_GATE = gql`
	mutation DeleteBlastGate($blastGateId: ID!) {
		deleteBlastGate(blastGateId: $blastGateId)
	}
`;

export const ACTIVATE_BLAST_GATE = gql`
	mutation ActivateBlastGate($blastGateId: ID!) {
		activateBlastGate(blastGateId: $blastGateId)
	}
`;

export const OPEN_ALL_BLAST_GATES = gql`
	mutation OpenAllBlastGates {
		openAllBlastGates
	}
`;

export const CLOSE_ALL_BLAST_GATES = gql`
	mutation CloseAllBlastGates {
		closeAllBlastGates
	}
`;
