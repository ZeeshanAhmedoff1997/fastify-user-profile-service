import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPrisma } from '../__mocks__/prisma';

vi.mock('../../src/utils/prisma', () => ({
  prisma: mockPrisma,
}));

import * as profileService from '../../src/services/profile.service';

describe('Profile Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllProfiles', () => {
    it('should fetch all profiles', async () => {
      mockPrisma.profile.findMany.mockResolvedValue([
        { id: 1, firstName: 'John', lastName: 'Doe', dateOfBirth: new Date() },
      ]);

      const result = await profileService.getAllProfiles();
      expect(result).toHaveLength(1);
      expect(result[0].firstName).toBe('John');
    });

    it('should return empty array when no profiles found', async () => {
      mockPrisma.profile.findMany.mockResolvedValue([]);
      const result = await profileService.getAllProfiles();
      expect(result).toEqual([]);
    });
  });

  describe('getProfileById', () => {
    it('should return profile if found', async () => {
      const mockProfile = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date(),
      };
      mockPrisma.profile.findUnique.mockResolvedValue(mockProfile);

      const result = await profileService.getProfileById(1);
      expect(result).toEqual(mockProfile);
    });

    it('should return null if profile not found', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(null);
      const result = await profileService.getProfileById(123);
      expect(result).toBeNull();
    });
  });

  describe('createProfile', () => {
    it('should create a new profile', async () => {
      const input = {
        firstName: 'Alice',
        lastName: 'Smith',
        dateOfBirth: '2000-01-01',
      };

      const mockResult = {
        id: 1,
        ...input,
        dateOfBirth: new Date(input.dateOfBirth),
      };

      mockPrisma.profile.create.mockResolvedValue(mockResult);

      const result = await profileService.createProfile(input);
      expect(result.id).toBe(1);
      expect(result.firstName).toBe('Alice');
    });
  });

  describe('updateProfile', () => {
    it('should update existing profile', async () => {
      const existing = {
        id: 1,
        firstName: 'Old',
        lastName: 'Name',
        dateOfBirth: new Date('1990-01-01'),
      };

      const input = {
        firstName: 'New',
        dateOfBirth: '1995-05-05',
      };

      mockPrisma.profile.findUnique.mockResolvedValue(existing);
      mockPrisma.profile.update.mockResolvedValue({
        ...existing,
        ...input,
        dateOfBirth: new Date(input.dateOfBirth),
      });

      const result = await profileService.updateProfile(1, input);
      expect(result?.firstName).toBe('New');
    });

    it('should return null if profile to update does not exist', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(null);
      const result = await profileService.updateProfile(123, {
        firstName: 'Nope',
      });
      expect(result).toBeNull();
    });

    it('should not transform date if not present in input', async () => {
      const existing = {
        id: 1,
        firstName: 'Existing',
        lastName: 'User',
        dateOfBirth: new Date('1990-01-01'),
      };

      mockPrisma.profile.findUnique.mockResolvedValue(existing);
      mockPrisma.profile.update.mockResolvedValue({
        ...existing,
        firstName: 'Updated',
      });

      const result = await profileService.updateProfile(1, {
        firstName: 'Updated',
      });
      expect(result?.firstName).toBe('Updated');
    });
  });
});
