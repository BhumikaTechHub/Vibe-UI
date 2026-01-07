import { FastifyRequest, FastifyReply } from 'fastify';

export async function analyzeHandler(request: FastifyRequest, reply: FastifyReply) {
    console.log("Analyze endpoint hit");
    // Mock response for Day 5
    return {
        userState: 'calm',
        explanation: 'Day 5 Mock Analysis'
    };
}
