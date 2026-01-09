import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

dotenv.config();

const fastify = Fastify({
    logger: true,
});

// ✅ Register CORS BEFORE routes
fastify.register(cors, {
    origin: "http://localhost:3000", // frontend
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
});

// ✅ Import routes AFTER plugins
import { analyzeHandler } from "./api/analyze";
import { generateHandler } from "./api/generate";

// Test route
fastify.get("/", async () => {
    return { hello: "world" };
});

// API routes
fastify.post("/api/analyze", analyzeHandler);
fastify.post("/api/generate", generateHandler);

const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: "0.0.0.0" });
        console.log("🚀 Backend running on http://localhost:3001");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
