// src/server.ts
import express from "express";
import { routes } from "./api/routes";

const app = express();
app.use(express.json());

app.use("/", routes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`wake-proxy running on port ${PORT}`);
});