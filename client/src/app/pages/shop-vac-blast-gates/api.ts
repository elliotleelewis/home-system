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
