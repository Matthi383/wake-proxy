import { WakeProxyApp } from "./app";
import { WakeService } from "./services/wakeService";

const app = new WakeProxyApp(
  "0.0.0.0",
  8080,
  true,
  new WakeService()
);

app.start();