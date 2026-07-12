import Fastify from "fastify";
import { routes } from "./api/routes";
import { loadAppConfig } from "./core/config";
import { FastifyInstance } from "fastify";
import { WakeService } from "./services/wakeService";

export class WakeProxyApp {

    readonly app: FastifyInstance;

    constructor(
        readonly host: string,
        readonly port: number,
        logger: boolean,
        wakeService: WakeService
    ) {

        this.app = Fastify({
            logger
        });

        this.app.register(routes, {
            wakeService
        });
    }

    async start() {
        await this.app.listen({
            host: this.host,
            port: this.port
        })
            .then(() => {
                console.log(
                    `wake-proxy running on port ${this.port}.`
                );
            });
    }

    async stop() {
        await this.app.close()
            .then(() => {
                console.log(
                    `wake-proxy was shut down.`
                );
            });
    }
}