import { FastifyInstance } from "fastify";
import { loadConfig } from "../core/config";
import { wakeDevice } from "../core/wol";

export async function wakeRoutes(app: FastifyInstance) {

  app.post("/:device", async (request, reply) => {

    const config = loadConfig();

    const { device } = request.params as {
      device: string;
    };

    const target = config.devices[device];

    if (!target) {
      return reply.status(404).send({
        error: "Device not found"
      });
    }

    try {
      await wakeDevice(target.mac);

      return {
        device,
        status: "waking",
        message: "Wake-on-LAN packet sent"
      };

    } catch (err) {
      return reply.status(500).send({
        error: "Failed to send WOL packet"
      });
    }

  });
}