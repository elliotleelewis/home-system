import { PrismaClient } from '@prisma/client';

export const PRISMA = new PrismaClient({
	log: ['info', 'query', 'warn', 'error'],
});
