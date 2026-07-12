import { loadDevicesConfig } from "../core/config";
import { wakeDevice } from "../core/wol";
import { DeviceNotFoundError } from "../errors/deviceNotFoundError";
import { Device } from "../types/device";


export class WakeService {

    private readonly devices: Record<string, Device>;


    constructor() {
        const config = loadDevicesConfig();

        this.devices = config.devices;
    }

    async wake(deviceName: string): Promise<void> {

        const device = this.devices[deviceName];


        if (!device) {
            throw new DeviceNotFoundError(deviceName);
        }

        this.sendWol(device);
    }

    private async sendWol(device: Device): Promise<void> {
        await wakeDevice(
            device.mac,
            device.broadcast,
            device.port
        );
    }

}