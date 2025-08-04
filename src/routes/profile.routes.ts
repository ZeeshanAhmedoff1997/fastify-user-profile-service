import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  idParamSchema,
  profileBodySchema,
  profileResponseSchema,
  profileUpdateSchema,
} from '../schemas/profile.schema';

import {
  getAllProfilesHandler,
  getProfileHandler,
  createProfileHandler,
  updateProfileHandler,
} from '../controllers/profile.controller';
import { errorResponse, successResponse } from '../schemas/response.schema';

export async function profileRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.route({
    method: 'GET',
    url: '/profiles',
    handler: getAllProfilesHandler,
    schema: {
      response: {
        200: successResponse(profileResponseSchema.array()),
      },
    },
  });

  typedApp.route({
    method: 'GET',
    url: '/profiles/:id',
    schema: {
      params: idParamSchema,
      response: {
        200: successResponse(profileResponseSchema),
        404: errorResponse,
      },
    },
    handler: getProfileHandler,
  });

  typedApp.route({
    method: 'POST',
    url: '/profiles',
    schema: {
      body: profileBodySchema,
      response: {
        201: successResponse(profileResponseSchema),
      },
    },
    handler: createProfileHandler,
  });

  typedApp.route({
    method: 'PUT',
    url: '/profiles/:id',
    schema: {
      params: idParamSchema,
      body: profileUpdateSchema,
      response: {
        200: successResponse(profileResponseSchema),
        404: errorResponse,
      },
    },
    handler: updateProfileHandler,
  });
}
