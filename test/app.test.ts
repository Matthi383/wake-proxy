import test from "node:test";
import assert from "node:assert";
import { WakeProxyApp } from "../src/app";
import { WakeService } from "../src/services/wakeService";

test("WakeProxyApp can be created", async () => {

    const app = new WakeProxyApp(
        "127.0.0.1",
        8080,
        true,
        new WakeService()
    );

    assert.ok(app);
});