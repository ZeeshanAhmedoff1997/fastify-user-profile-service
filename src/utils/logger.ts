import { FastifyRequest } from 'fastify';

export const logInfo = (
  req: FastifyRequest,
  message: string,
  meta: Record<string, unknown> = {}
) => {
  req.log.info(meta, message);
};

export const logWarn = (
  req: FastifyRequest,
  message: string,
  meta: Record<string, unknown> = {}
) => {
  req.log.warn(meta, message);
};

export const logError = (
  req: FastifyRequest,
  message: string,
  meta: Record<string, unknown> = {}
) => {
  req.log.error(meta, message);
};
