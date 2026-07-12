import fs from "node:fs";
import yaml from "js-yaml";
import { Device } from "../types/device";

export type DeviceConfig = {
  devices: Record<string, Device>;
};

export const loadDevicesConfig = (): DeviceConfig => {
  const file = fs.readFileSync(
    "./config/devices.yaml",
    "utf8"
  );

  return yaml.load(file) as DeviceConfig;
};

export type AppConfig = {
  hostname: string,
  port: number
};

export const loadAppConfig = (): AppConfig => {
  const file = fs.readFileSync(
    "./config/wake-proxy.yaml",
    "utf8"
  );

  return yaml.load(file) as AppConfig;
};