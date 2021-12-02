import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { config } from 'dotenv';
import * as cors from 'cors';
import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { Resolvers } from '@app/schema';

import {
	activateBlastGate,
	closeAllBlastGates,
	deleteBlastGate,
	openAllBlastGates,
	upsertBlastGate,
} from './src/mutations';
import { blastGate, blastGates } from './src/queries';
import { prisma } from './prisma';

config();

// Construct a schema, using GraphQL schema language
const schema = loadSchemaSync('../node_modules/@app/schema/schema.graphql', {
	loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
	Mutation: {
		upsertBlastGate,
		deleteBlastGate,
		openAllBlastGates,
		closeAllBlastGates,
		activateBlastGate,
	},
	Query: {
		blastGates,
		blastGate,
	},
	BlastGate: {
		id: (blastGate) => blastGate.id,
		name: (blastGate) => blastGate.name,
		isOpen: (blastGate) => blastGate.isOpen,
	},
};

const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

const port = 8080;

const app = express();
app.use('/graphql', [
	cors({
		origin: '*',
	}),
	graphqlHTTP({
		schema: executableSchema,
		graphiql: true,
	}),
]);
app.listen(port);

process.on('SIGTERM', () => prisma.$disconnect());
process.on('SIGINT', () => prisma.$disconnect());

console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
