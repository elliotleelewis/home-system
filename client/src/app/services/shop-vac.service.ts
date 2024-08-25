import { Injectable, inject } from '@angular/core';
import {
	type BlastGate,
	type MutationActivateBlastGateArgs,
	type MutationDeleteBlastGateArgs,
	type MutationUpsertBlastGateArgs,
	type QueryBlastGateArgs,
} from '@app/schema';
import { Apollo, type QueryRef } from 'apollo-angular';
import { type Observable, map, tap } from 'rxjs';

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
	type ActivateBlastGateMutation,
	type ActivateBlastGateMutationVariables,
	type BlastGateQuery,
	type BlastGateQueryVariables,
	type BlastGatesQuery,
	type BlastGatesQueryVariables,
	type CloseAllBlastGatesMutation,
	type CloseAllBlastGatesMutationVariables,
	type DeleteBlastGateMutation,
	type DeleteBlastGateMutationVariables,
	type OpenAllBlastGatesMutation,
	type OpenAllBlastGatesMutationVariables,
	type UpsertBlastGateMutation,
	type UpsertBlastGateMutationVariables,
} from './api.generated';

@Injectable({
	providedIn: 'root',
})
export class ShopVacService {
	private readonly _apollo = inject(Apollo);

	getBlastGatesQuery?: QueryRef<BlastGatesQuery, BlastGatesQueryVariables>;

	getBlastGates(): Observable<BlastGate[]> {
		this.getBlastGatesQuery ??= this._apollo.watchQuery<
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
		return this._apollo
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
		return this._apollo
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
		return this._apollo
			.mutate<DeleteBlastGateMutation, DeleteBlastGateMutationVariables>({
				mutation: DELETE_BLAST_GATE,
				variables: {
					blastGateId,
				},
			})
			.pipe(
				map((mutation) => mutation.data?.deleteBlastGate ?? null),
				tap(() =>
					this._apollo.client.cache.evict({
						id: blastGateId,
						broadcast: true,
					}),
				),
			);
	}

	activateBlastGate({
		blastGateId,
	}: MutationActivateBlastGateArgs): Observable<BlastGate[] | null> {
		return this._apollo
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
		return this._apollo
			.mutate<
				OpenAllBlastGatesMutation,
				OpenAllBlastGatesMutationVariables
			>({
				mutation: OPEN_ALL_BLAST_GATES,
			})
			.pipe(map((mutation) => mutation.data?.openAllBlastGates ?? null));
	}

	closeAllBlastGates(): Observable<BlastGate[] | null> {
		return this._apollo
			.mutate<
				CloseAllBlastGatesMutation,
				CloseAllBlastGatesMutationVariables
			>({
				mutation: CLOSE_ALL_BLAST_GATES,
			})
			.pipe(map((mutation) => mutation.data?.closeAllBlastGates ?? null));
	}
}
