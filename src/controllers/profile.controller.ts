import { FastifyRequest, FastifyReply } from 'fastify';
import * as profileService from '../services/profile.service';
import { ProfileDTO } from '../models/profile.model';
import { logInfo, logWarn } from '../utils/logger';

const notFound = (reply: FastifyReply, message = 'Profile not found') =>
  reply.code(404).send({ status: 'error', message });

export const getAllProfilesHandler = async (
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  const profiles = await profileService.getAllProfiles();
  logInfo(_req, 'Fetched all profiles', { count: profiles.length });
  reply.send({ status: 'success', data: profiles });
};

export const getProfileHandler = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(req.params.id);
  const profile = await profileService.getProfileById(id);
  if (!profile) {
    logWarn(req, 'Profile not found', { id });
    return notFound(reply);
  }

  logInfo(req, 'Fetched profile', { id: profile.id });
  reply.send({ status: 'success', data: profile });
};

export const createProfileHandler = async (
  req: FastifyRequest<{ Body: ProfileDTO }>,
  reply: FastifyReply
) => {
  const profile = await profileService.createProfile(req.body);
  logInfo(req, 'Created new profile', { id: profile.id });
  reply.code(201).send({ status: 'success', data: profile });
};

export const updateProfileHandler = async (
  req: FastifyRequest<{ Params: { id: string }; Body: ProfileDTO }>,
  reply: FastifyReply
) => {
  const id = Number(req.params.id);
  const updated = await profileService.updateProfile(id, req.body);
  if (!updated) {
    logWarn(req, 'Attempted to update non-existent profile', { id });
    return notFound(reply);
  }

  logInfo(req, 'Updated profile', { id });
  reply.send({ status: 'success', data: updated });
};
