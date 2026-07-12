export class DeviceNotFoundError extends Error {

    constructor(deviceName: string) {

        super(
            `Device '${deviceName}' not found!`
        );

        this.name = "DeviceNotFoundError";
    }

}