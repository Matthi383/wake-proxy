import * as dgram from "dgram";

const MAC_REGEX = /^[0-9a-fA-F]{12}$/;

export async function wakeDevice(
  mac: string,
  broadcast = "255.255.255.255",
  port = 9
): Promise<void> {

  const cleanMac = mac.replace(/[:-]/g, "");

  if (!MAC_REGEX.test(cleanMac)) {
    throw new Error("Invalid MAC address");
  }

  const macBuffer = Buffer.from(cleanMac, "hex");

  const magicPacket = Buffer.alloc(
    6 + (16 * macBuffer.length)
  );

  magicPacket.fill(0xff, 0, 6);


  for (let i = 0; i < 16; i++) {
    macBuffer.copy(
      magicPacket,
      6 + i * macBuffer.length
    );
  }

  const socket = dgram.createSocket("udp4");

  return new Promise((resolve, reject) => {


    socket.on("error", (err) => {
      socket.close();
      reject(err);
    });


    socket.bind(() => {

      socket.setBroadcast(true);
      socket.send(
        magicPacket,
        port,
        broadcast,

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