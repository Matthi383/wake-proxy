import test from "node:test";
import assert from "node:assert";

import { loadDevicesConfig, loadAppConfig } from "../src/core/config";


test("wake-proxy.yaml loads correctly", () => {

    const config = loadAppConfig();

    assert.ok(config);

});

test("devices.yaml loads correctly", () => {

    const config = loadDevicesConfig();

    assert.ok(config.devices);

    assert.ok(
        config.devices.example
    );

    assert.ok(
        config.devices.example.mac
    );

});