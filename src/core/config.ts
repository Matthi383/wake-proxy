// src/core/config.ts
import fs from "fs";
import yaml from "js-yaml";
import { Device } from "../types/device";

export type Config = {
  devices: Record<string, Device>;
};

export const loadConfig = (): Config => {
  const file = fs.readFileSync("./config/devices.yaml", "utf8");
  return yaml.load(file) as Config;
};