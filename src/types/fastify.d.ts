// src/types/fastify.d.ts
import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      DATABASE_URL: string;
      PORT: string;
    };
  }
}
