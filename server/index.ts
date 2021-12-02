import { Resolvers } from '@app/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as cors from 'cors';
import { config } from 'dotenv';
import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';

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
const schema = loadSchemaSync('../node_modules/@app/schema/schema.graphql', {
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

process.on('SIGTERM', () => void PRISMA.$disconnect());
process.on('SIGINT', () => void PRISMA.$disconnect());

console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
