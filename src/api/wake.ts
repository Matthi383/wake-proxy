import { FastifyInstance } from "fastify";
import { loadDevicesConfig } from "../core/config";
import { WakeService } from "../services/wakeService";
import { DeviceNotFoundError } from "../errors/deviceNotFoundError";

export async function wakeRoutes(
  app: FastifyInstance,
  options: {
    wakeService: WakeService
  }
) {

  app.post("/:deviceName", async (request, reply) => {

    const config = loadDevicesConfig();

    const { deviceName } = request.params as {
      deviceName: string;
    };

    try {
      await options.wakeService.wake(deviceName);

      return reply.status(202).send({
        device: deviceName,
        status: "waking",
        message: "Wake-on-LAN packet sent"
      });

    } catch (err) {
      request.log.error(err);

      if (err instanceof DeviceNotFoundError) {
        return reply.status(404).send({
          error: err.message
        });
      }

      return reply.status(500).send({
        error: "Failed to send WOL packet"
      });
    }

  });
}