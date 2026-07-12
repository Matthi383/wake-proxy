import test from "node:test";
import assert from "node:assert";

import { wakeDevice } from "../src/core/wol";


test("Invalid MAC address should fail", async () => {

    await assert.rejects(
        async () => {
            await wakeDevice("invalid-mac");
        },
        {
            message: "Invalid MAC address"
        }
    );

});