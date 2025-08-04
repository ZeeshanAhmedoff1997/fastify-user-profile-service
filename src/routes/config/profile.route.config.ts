import {
  getAllProfilesHandler,
  getProfileHandler,
  createProfileHandler,
  updateProfileHandler,
} from '../../controllers/profile.controller';

import { idParamSchema, profileBodySchema } from '../../schemas/profile.schema';

export const profileRoutesConfig = [
  {
    method: 'GET',
    url: '/profiles',
    handler: getAllProfilesHandler,
  },
  {
    method: 'GET',
    url: '/profiles/:id',
    schema: {
      params: idParamSchema,
    },
    handler: getProfileHandler,
  },
  {
    method: 'POST',
    url: '/profiles',
    schema: {
      body: profileBodySchema,
    },
    handler: createProfileHandler,
  },
  {
    method: 'PUT',
    url: '/profiles/:id',
    schema: {
      params: idParamSchema,
      body: profileBodySchema,
    },
    handler: updateProfileHandler,
  },
];
