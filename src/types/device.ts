// src/types/device.ts
export type Device = {
  mac: string;
  ip: string;
  port?: number;
  healthcheck?: string;
};