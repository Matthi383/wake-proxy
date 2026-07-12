import Fastify from "fastify";

const healthEndpoint = Fastify();

healthEndpoint.get("/health", async () => {
  return { status: "ok" };
});

await healthEndpoint.listen({ port: 3000 });