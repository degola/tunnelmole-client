import fetch from "node-fetch";
import config from "../../config.js";
import { Message } from "./message.js";

const isTelemetryDisabled = () => {
    return process.env.TUNNELMOLE_TELEMETRY === '0';
}

const sendMessage = async function(message: Message) {
    // Stop if telemetry is disabled
    if (isTelemetryDisabled()) {
        return;
    }
    const telemetryEndpoint = `${config.hostip.httpEndpoint}/tunnelmole-log-telemetry`

    try {
        await fetch(telemetryEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message)
        });
    } catch(e) {
        console.error('unable to send telemetry, consider TUNNELMOLE_TELEMETRY=0 to disable telemetry: ', e.message);
    }

    return;
}

export { sendMessage };
