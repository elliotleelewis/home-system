/* eslint-disable @typescript-eslint/array-type,@typescript-eslint/ban-types,@typescript-eslint/naming-convention,@typescript-eslint/no-explicit-any,id-blacklist */
import { GraphQLResolveInfo } from 'graphql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
	[P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type BlastGate = {
	__typename?: 'BlastGate';
	id: Scalars['ID'];
	isOpen: Scalars['Boolean'];
	name: Scalars['String'];
};

export type BlastGateInput = {
	id: InputMaybe<Scalars['ID']>;
	isOpen: Scalars['Boolean'];
	name: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	activateBlastGate: Array<BlastGate>;
	closeAllBlastGates: Array<BlastGate>;
	deleteBlastGate: Scalars['Boolean'];
	openAllBlastGates: Array<BlastGate>;
	upsertBlastGate: BlastGate;
};

export type MutationActivateBlastGateArgs = {
	blastGateId: Scalars['ID'];
};

export type MutationDeleteBlastGateArgs = {
	blastGateId: Scalars['ID'];
};

export type MutationUpsertBlastGateArgs = {
	blastGateInput: BlastGateInput;
};

export type Query = {
	__typename?: 'Query';
	blastGate: BlastGate;
	blastGates: Array<BlastGate>;
};

export type QueryBlastGateArgs = {
	blastGateId: Scalars['ID'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {},
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {},
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	BlastGate: ResolverTypeWrapper<BlastGate>;
	BlastGateInput: BlastGateInput;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	Mutation: ResolverTypeWrapper<{}>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	BlastGate: BlastGate;
	BlastGateInput: BlastGateInput;
	Boolean: Scalars['Boolean'];
	ID: Scalars['ID'];
	Mutation: {};
	Query: {};
	String: Scalars['String'];
};

export type BlastGateResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['BlastGate'] = ResolversParentTypes['BlastGate'],
> = {
	id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	isOpen: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
	activateBlastGate: Resolver<
		Array<ResolversTypes['BlastGate']>,
		ParentType,
		ContextType,
		RequireFields<MutationActivateBlastGateArgs, 'blastGateId'>
	>;
	closeAllBlastGates: Resolver<
		Array<ResolversTypes['BlastGate']>,
		ParentType,
		ContextType
	>;
	deleteBlastGate: Resolver<
		ResolversTypes['Boolean'],
		ParentType,
		ContextType,
		RequireFields<MutationDeleteBlastGateArgs, 'blastGateId'>
	>;
	openAllBlastGates: Resolver<
		Array<ResolversTypes['BlastGate']>,
		ParentType,
		ContextType
	>;
	upsertBlastGate: Resolver<
		ResolversTypes['BlastGate'],
		ParentType,
		ContextType,
		RequireFields<MutationUpsertBlastGateArgs, 'blastGateInput'>
	>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
	blastGate: Resolver<
		ResolversTypes['BlastGate'],
		ParentType,
		ContextType,
		RequireFields<QueryBlastGateArgs, 'blastGateId'>
	>;
	blastGates: Resolver<
		Array<ResolversTypes['BlastGate']>,
		ParentType,
		ContextType
	>;
};

export type Resolvers<ContextType = any> = {
	BlastGate: BlastGateResolvers<ContextType>;
	Mutation: MutationResolvers<ContextType>;
	Query: QueryResolvers<ContextType>;
};

/* eslint-enable */
