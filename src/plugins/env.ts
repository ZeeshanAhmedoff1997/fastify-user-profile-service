import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { FastifyPluginAsync } from "fastify";

const envPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(fastifyEnv, {
    schema: {
      type: "object",
      required: ["DATABASE_URL", "PORT"],
      properties: {
        DATABASE_URL: { type: "string" },
        PORT: { type: "string" },
      },
    },
    dotenv: true,
    confKey: "config",
  });
});

export default envPlugin;
