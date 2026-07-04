// src/api/wake.ts
import { Router } from "express";
import { loadConfig } from "../core/config";
import { wakeDevice } from "../core/wol";

export const wakeRouter = Router();

wakeRouter.post("/:device", async (req, res) => {
  const config = loadConfig();
  const deviceName = req.params.device;

  const device = config.devices[deviceName];

  if (!device) {
    return res.status(404).json({ error: "Device not found" });
  }

  try {
    await wakeDevice(device.mac);

    return res.json({
      device: deviceName,
      status: "waking",
      message: "Wake-on-LAN packet sent"
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to send WOL packet"
    });
  }
});