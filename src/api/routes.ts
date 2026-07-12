import { FastifyInstance } from "fastify";
import { wakeRoutes } from "./wake";
import { healthRoutes } from "./health";


export async function routes(app: FastifyInstance) {

  await app.register(healthRoutes);

  await app.register(wakeRoutes, {
    prefix: "/wake"
  });

}