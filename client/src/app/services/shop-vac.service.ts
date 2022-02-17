import { Injectable } from '@angular/core';
import {
	BlastGate,
	MutationActivateBlastGateArgs,
	MutationDeleteBlastGateArgs,
	MutationUpsertBlastGateArgs,
	QueryBlastGateArgs,
} from '@app/schema';
import { Apollo, QueryRef } from 'apollo-angular';
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
	getBlastGatesQuery?: QueryRef<BlastGatesQuery, BlastGatesQueryVariables>;

	constructor(private apollo: Apollo) {}

	getBlastGates(): Observable<BlastGate[]> {
		this.getBlastGatesQuery ??= this.apollo.watchQuery<
			BlastGatesQuery,
			BlastGatesQueryVariables
		>({
			query: BLAST_GATES,
		});
		return this.getBlastGatesQuery.valueChanges.pipe(
			map((q) => q.data.blastGates),
		);
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
				map((mutation) => mutation.data?.upsertBlastGate ?? null),
				tap(
					() =>
						blastGateInput.id === null &&
						void this.getBlastGatesQuery?.refetch(),
				),
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
				map((mutation) => mutation.data?.deleteBlastGate ?? null),
				tap(() =>
					this.apollo.client.cache.evict({
						id: blastGateId,
						broadcast: true,
					}),
				),
			);
	}

	activateBlastGate({
		blastGateId,
	}: MutationActivateBlastGateArgs): Observable<BlastGate[] | null> {
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
			.pipe(map((mutation) => mutation.data?.activateBlastGate ?? null));
	}

	openAllBlastGates(): Observable<BlastGate[] | null> {
		return this.apollo
			.mutate<
				OpenAllBlastGatesMutation,
				OpenAllBlastGatesMutationVariables
			>({
				mutation: OPEN_ALL_BLAST_GATES,
			})
			.pipe(map((mutation) => mutation.data?.openAllBlastGates ?? null));
	}

	closeAllBlastGates(): Observable<BlastGate[] | null> {
		return this.apollo
			.mutate<
				CloseAllBlastGatesMutation,
				CloseAllBlastGatesMutationVariables
			>({
				mutation: CLOSE_ALL_BLAST_GATES,
			})
			.pipe(map((mutation) => mutation.data?.closeAllBlastGates ?? null));
	}
}
