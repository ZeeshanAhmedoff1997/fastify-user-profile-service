import { z } from 'zod';

export const successResponse = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    status: z.literal('success'),
    data,
  });

export const errorResponse = z.object({
  status: z.literal('error'),
  message: z.string(),
});
