import { FastifyInstance } from "fastify";

export type App = {
    host: string;
    port?: number;
    app: FastifyInstance;
};