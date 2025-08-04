import { vi } from 'vitest';

export const mockPrisma = {
  profile: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};
