import { z } from 'zod';
import { validationMessages as msg } from '../constants/messages';

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: msg.id }),
});

export const profileBodySchema = z.object({
  firstName: z.string().min(1, { message: msg.requiredFirstName }),
  lastName: z.string().min(1, { message: msg.requiredLastName }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: msg.invalidDateFormat,
  }),
});

export const profileUpdateSchema = profileBodySchema.partial();

export const profileResponseSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date().transform((date) => date.toISOString().split('T')[0]),
});
