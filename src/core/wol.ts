// src/core/wol.ts
import * as dgram from "dgram";

export async function wakeDevice(mac: string): Promise<void> {
  const cleanMac = mac.replace(/[:-]/g, "");

  if (cleanMac.length !== 12) {
    throw new Error("Invalid MAC address");
  }

  const macBuffer = Buffer.from(cleanMac, "hex");

  const magicPacket = Buffer.alloc(6 + 16 * 6);

  magicPacket.fill(0xff, 0, 6);

  for (let i = 0; i < 16; i++) {
    macBuffer.copy(magicPacket, 6 + i * 6);
  }

  const socket = dgram.createSocket("udp4");

  return new Promise((resolve, reject) => {
    socket.bind(() => {
      socket.setBroadcast(true);

      socket.send(
        magicPacket,
        0,
        magicPacket.length,
        9,
        "255.255.255.255",
        (err) => {
          socket.close();

          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  });
}