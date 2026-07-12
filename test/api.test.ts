import test from "node:test";
import assert from "node:assert";
import { WakeProxyApp } from "../src/app";
import { WakeService } from "../src/services/wakeService";

//not used yet
const fakeWakeService = {
    devices: {},
    wake: async () => { },
    sendWol: async () => { }
};

const wakeService = new WakeService();

test("/health returns ok", async () => {

    const server = new WakeProxyApp(
        "127.0.0.1",
        8080,
        true,
        wakeService
    );

    const response = await server.app.inject({
        method: "GET",
        url: "/health"
    });

    assert.strictEqual(
        response.statusCode,
        200
    );

    assert.deepStrictEqual(
        response.json(),
        {
            status: "ok"
        }
    );

    await server.stop();
});

//TODO: still needs to be defined
/*test("/wake/example is found", async () => {

    const server = new WakeProxyApp(
        "127.0.0.1",
        8080,
        false,
        fakeWakeService
    );


    const response = await server.app.inject({
        method: "POST",
        url: "/wake/unknown",
        payload: {}
    });


    assert.strictEqual(
        response.statusCode,
        404
    );


    assert.deepStrictEqual(
        response.json(),
        {
            error: "Device 'unknown' not found!"
        }
    );


    await server.app.close();
});*/

test("/wake/unknown returns 404", async () => {

    const server = new WakeProxyApp(
        "127.0.0.1",
        8080,
        false,
        new WakeService()
    );


    const response = await server.app.inject({
        method: "POST",
        url: "/wake/unknown",
        payload: {}
    });


    assert.strictEqual(
        response.statusCode,
        404
    );


    assert.deepStrictEqual(
        response.json(),
        {
            error: "Device 'unknown' not found!"
        }
    );


    await server.app.close();
});