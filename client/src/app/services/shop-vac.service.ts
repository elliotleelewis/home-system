import { Injectable } from '@angular/core';
import {
	BlastGate,
	MutationActivateBlastGateArgs,
	MutationDeleteBlastGateArgs,
	MutationUpsertBlastGateArgs,
	QueryBlastGateArgs,
} from '@app/schema';
import { Apollo } from 'apollo-angular';
import { QueryRef } from 'apollo-angular/query-ref';
import { map, Observable, tap } from 'rxjs';

import {
	ACTIVATE_BLAST_GATE,
	BLAST_GATE,
	BLAST_GATES,
	CLOSE_ALL_BLAST_GATES,
	DELETE_BLAST_GATE,
	OPEN_ALL_BLAST_GATES,
	UPSERT_BLAST_GATE,
} from './api';
import {
	ActivateBlastGateMutation,
	ActivateBlastGateMutationVariables,
	BlastGateQuery,
	BlastGateQueryVariables,
	BlastGatesQuery,
	BlastGatesQueryVariables,
	CloseAllBlastGatesMutation,
	CloseAllBlastGatesMutationVariables,
	DeleteBlastGateMutation,
	DeleteBlastGateMutationVariables,
	OpenAllBlastGatesMutation,
	OpenAllBlastGatesMutationVariables,
	UpsertBlastGateMutation,
	UpsertBlastGateMutationVariables,
} from './api.generated';

@Injectable({
	providedIn: 'root',
})
export class ShopVacService {
	getAllBlastGatesQuery?: QueryRef<BlastGatesQuery, BlastGatesQueryVariables>;

	constructor(private apollo: Apollo) {}

	getAllBlastGates(): Observable<BlastGate[]> {
		let query: QueryRef<BlastGatesQuery, BlastGatesQueryVariables>;
		if (this.getAllBlastGatesQuery) {
			query = this.getAllBlastGatesQuery;
		} else {
			query = this.apollo.watchQuery<
				BlastGatesQuery,
				BlastGatesQueryVariables
			>({
				query: BLAST_GATES,
			});
			this.getAllBlastGatesQuery = query;
		}
		return query.valueChanges.pipe(map((q) => q.data.blastGates));
	}

	getBlastGate({ blastGateId }: QueryBlastGateArgs): Observable<BlastGate> {
		return this.apollo
			.watchQuery<BlastGateQuery, BlastGateQueryVariables>({
				query: BLAST_GATE,
				variables: {
					blastGateId,
				},
			})
			.valueChanges.pipe(map((query) => query.data.blastGate));
	}

	upsertBlastGate({
		blastGateInput,
	}: MutationUpsertBlastGateArgs): Observable<BlastGate | null> {
		return this.apollo
			.mutate<UpsertBlastGateMutation, UpsertBlastGateMutationVariables>({
				mutation: UPSERT_BLAST_GATE,
				variables: {
					blastGateInput,
				},
			})
			.pipe(
				tap(() => void this.getAllBlastGatesQuery?.refetch()),
				map((mutation) => mutation.data?.upsertBlastGate ?? null),
			);
	}

	deleteBlastGate({
		blastGateId,
	}: MutationDeleteBlastGateArgs): Observable<boolean | null> {
		return this.apollo
			.mutate<DeleteBlastGateMutation, DeleteBlastGateMutationVariables>({
				mutation: DELETE_BLAST_GATE,
				variables: {
					blastGateId,
				},
			})
			.pipe(
				tap(() => void this.getAllBlastGatesQuery?.refetch()),
				map((mutation) => mutation.data?.deleteBlastGate ?? null),
			);
	}

	activateBlastGate({
		blastGateId,
	}: MutationActivateBlastGateArgs): Observable<boolean | null> {
		return this.apollo
			.mutate<
				ActivateBlastGateMutation,
				ActivateBlastGateMutationVariables
			>({
				mutation: ACTIVATE_BLAST_GATE,
				variables: {
					blastGateId,
				},
			})
			.pipe(
				tap(() => void this.getAllBlastGatesQuery?.refetch()),
				map((mutation) => mutation.data?.activateBlastGate ?? null),
			);
	}

	openAllBlastGates(): Observable<boolean | null> {
		return this.apollo
			.mutate<
				OpenAllBlastGatesMutation,
				OpenAllBlastGatesMutationVariables
			>({
				mutation: OPEN_ALL_BLAST_GATES,
			})
			.pipe(
				tap(() => void this.getAllBlastGatesQuery?.refetch()),
				map((mutation) => mutation.data?.openAllBlastGates ?? null),
			);
	}

	closeAllBlastGates(): Observable<boolean | null> {
		return this.apollo
			.mutate<
				CloseAllBlastGatesMutation,
				CloseAllBlastGatesMutationVariables
			>({
				mutation: CLOSE_ALL_BLAST_GATES,
			})
			.pipe(
				tap(() => void this.getAllBlastGatesQuery?.refetch()),
				map((mutation) => mutation.data?.closeAllBlastGates ?? null),
			);
	}
}
