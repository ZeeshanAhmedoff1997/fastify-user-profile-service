import { prisma } from '../utils/prisma';
import type { Profile } from '@prisma/client';
import { ProfileInput } from '../types/profile';

export const getAllProfiles = async (): Promise<Profile[]> => {
  return prisma.profile.findMany({ orderBy: { id: 'asc' } });
};

export const getProfileById = async (id: number): Promise<Profile | null> => {
  return prisma.profile.findUnique({ where: { id } });
};

export const createProfile = async (input: ProfileInput): Promise<Profile> => {
  return prisma.profile.create({
    data: {
      ...input,
      dateOfBirth: new Date(input.dateOfBirth),
    },
  });
};

export const updateProfile = async (
  id: number,
  input: Partial<ProfileInput>
): Promise<Profile | null> => {
  const exists = await prisma.profile.findUnique({ where: { id } });
  if (!exists) return null;

  const data: Partial<Profile> = {
    ...input,
    ...(input.dateOfBirth ? { dateOfBirth: new Date(input.dateOfBirth) } : {}),
  };

  return prisma.profile.update({
    where: { id },
    data,
  });
};
