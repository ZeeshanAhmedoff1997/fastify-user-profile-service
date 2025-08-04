import { FastifyInstance } from 'fastify';
import { profileRoutes } from './profile.routes';

export async function registerRoutes(app: FastifyInstance) {
  await app.register(profileRoutes);
}
