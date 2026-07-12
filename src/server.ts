import Fastify from "fastify";
import { routes } from "./api/routes";

const app = Fastify({
  logger: true
});

await app.register(routes);

const PORT = 8080;

app.listen({
  port: PORT,
  host: "0.0.0.0"
})
.then(() => {

  console.log(
    `wake-proxy running on port ${PORT}`
  );

});