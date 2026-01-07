import { FastifyRequest, FastifyReply } from 'fastify';

export async function generateHandler(request: FastifyRequest, reply: FastifyReply) {
    console.log("Generate endpoint hit");
    // Mock response for Day 5
    return {
        uiSchema: {
            type: 'container',
            props: { padding: 'loose' },
            children: [
                {
                    type: 'text',
                    props: { content: 'Day 5 Mock UI Generation' }
                }
            ]
        },
        vibe: 'calm_guided'
    };
}
