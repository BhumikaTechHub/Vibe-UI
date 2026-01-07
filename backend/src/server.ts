import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
    logger: true
});

import { analyzeHandler } from './api/analyze';
import { generateHandler } from './api/generate';

fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

fastify.post('/api/analyze', analyzeHandler);
fastify.post('/api/generate', generateHandler);

const start = async () => {
    try {
        await fastify.listen({ port: 3001 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
