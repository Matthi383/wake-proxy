import { FastifyInstance } from "fastify";
import { wakeRoutes } from "./wake";
import { healthRoutes } from "./health";
import { WakeService } from "../services/wakeService";


export async function routes(
  app: FastifyInstance,
  options: {
    wakeService: WakeService
  }
) {

  await app.register(healthRoutes);

  await app.register(wakeRoutes, {
    prefix: "/wake",
    wakeService: options.wakeService
  });

}