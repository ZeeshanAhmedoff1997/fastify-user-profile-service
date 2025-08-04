import { FastifyRequest, FastifyReply } from 'fastify';
import * as profileService from '../services/profile.service';
import { ProfileDTO } from '../models/profile.model';

const notFound = (reply: FastifyReply, message = 'Profile not found') =>
  reply.code(404).send({ status: 'error', message });

export const getAllProfilesHandler = async (_req: FastifyRequest, reply: FastifyReply) => {
  const profiles = await profileService.getAllProfiles();
  reply.send({ status: 'success', data: profiles });
};

export const getProfileHandler = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const profile = await profileService.getProfileById(Number(req.params.id));
  if (!profile) return notFound(reply);
  reply.send({ status: 'success', data: profile });
};

export const createProfileHandler = async (
  req: FastifyRequest<{ Body: ProfileDTO }>,
  reply: FastifyReply
) => {
  const profile = await profileService.createProfile(req.body);
  reply.code(201).send({ status: 'success', data: profile });
};

export const updateProfileHandler = async (
  req: FastifyRequest<{ Params: { id: string }; Body: ProfileDTO }>,
  reply: FastifyReply
) => {
  const updated = await profileService.updateProfile(Number(req.params.id), req.body);
  if (!updated) return notFound(reply);
  reply.send({ status: 'success', data: updated });
};
