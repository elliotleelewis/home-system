import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import type { Resolvers } from '@app/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { config } from 'dotenv';

import { PRISMA } from './prisma';
import {
	activateBlastGate,
	closeAllBlastGates,
	deleteBlastGate,
	openAllBlastGates,
	upsertBlastGate,
} from './src/mutations';
import { blastGate, blastGates } from './src/queries';

config();

// Construct a schema, using GraphQL schema language
const schema = loadSchemaSync('./node_modules/@app/schema/schema.graphql', {
	loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Mutation: {
		upsertBlastGate,
		deleteBlastGate,
		openAllBlastGates,
		closeAllBlastGates,
		activateBlastGate,
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Query: {
		blastGates,
		blastGate,
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	BlastGate: {
		id: (bg) => bg.id,
		name: (bg) => bg.name,
		isOpen: (bg) => bg.isOpen,
	},
};

const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

const server = new ApolloServer({
	schema: executableSchema,
});

const port = 8080;
void startStandaloneServer(server, { listen: { port } }).then(() => {
	console.log(
		`Running a GraphQL API server at http://localhost:${String(port)}/graphql`,
	);
});

const kill = async () => {
	await PRISMA.$disconnect();
	await server.stop();
};

process.on('SIGTERM', () => void kill());
process.on('SIGINT', () => void kill());
