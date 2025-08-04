import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllProfilesHandler,
  getProfileHandler,
  createProfileHandler,
  updateProfileHandler,
} from '../../src/controllers/profile.controller';
import * as profileService from '../../src/services/profile.service';

vi.mock('../../src/services/profile.service');
vi.mock('../../src/utils/logger', () => ({
  logInfo: vi.fn(),
  logWarn: vi.fn(),
}));

const mockReply = () => {
  const reply = {
    code: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
  return reply;
};

describe('Profile Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllProfilesHandler', () => {
    it('should return all profiles with success', async () => {
      const req = {} as any;
      const reply = mockReply();
      const mockProfiles = [
        { id: 1, firstName: 'John', lastName: 'Doe', dateOfBirth: new Date() },
      ];
      (profileService.getAllProfiles as any).mockResolvedValue(mockProfiles);

      await getAllProfilesHandler(req, reply as any);

      expect(reply.send).toHaveBeenCalledWith({
        status: 'success',
        data: mockProfiles,
      });
    });
  });

  describe('getProfileHandler', () => {
    it('should return a profile if found', async () => {
      const req = { params: { id: '1' } } as any;
      const reply = mockReply();
      const mockProfile = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date(),
      };
      (profileService.getProfileById as any).mockResolvedValue(mockProfile);

      await getProfileHandler(req, reply as any);

      expect(reply.send).toHaveBeenCalledWith({
        status: 'success',
        data: mockProfile,
      });
    });

    it('should return 404 if profile not found', async () => {
      const req = { params: { id: '1' } } as any;
      const reply = mockReply();
      (profileService.getProfileById as any).mockResolvedValue(null);

      await getProfileHandler(req, reply as any);

      expect(reply.code).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile not found',
      });
    });
  });

  describe('createProfileHandler', () => {
    it('should create a profile and return 201', async () => {
      const req = {
        body: { firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' },
      } as any;
      const reply = mockReply();
      const mockProfile = { id: 1, ...req.body };
      (profileService.createProfile as any).mockResolvedValue(mockProfile);

      await createProfileHandler(req, reply as any);

      expect(reply.code).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith({
        status: 'success',
        data: mockProfile,
      });
    });
  });

  describe('updateProfileHandler', () => {
    it('should update and return profile', async () => {
      const req = {
        params: { id: '1' },
        body: { firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' },
      } as any;
      const reply = mockReply();
      const updatedProfile = { id: 1, ...req.body };
      (profileService.updateProfile as any).mockResolvedValue(updatedProfile);

      await updateProfileHandler(req, reply as any);

      expect(reply.send).toHaveBeenCalledWith({
        status: 'success',
        data: updatedProfile,
      });
    });

    it('should return 404 if profile not found during update', async () => {
      const req = {
        params: { id: '1' },
        body: { firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' },
      } as any;
      const reply = mockReply();
      (profileService.updateProfile as any).mockResolvedValue(null);

      await updateProfileHandler(req, reply as any);

      expect(reply.code).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile not found',
      });
    });
  });
});
