// src/core/wol.ts
import wol from "wake_on_lan";

export const wakeDevice = (mac: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    wol.wake(mac, (err: any) => {
      if (err) return reject(err);
      resolve();
    });
  });
};