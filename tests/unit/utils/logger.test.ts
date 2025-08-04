import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logInfo, logWarn } from '../../../src/utils/logger';

describe('Logger Utils', () => {
  const mockReq: any = {
    log: {
      info: vi.fn(),
      warn: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log info with metadata', () => {
    const message = 'User created';
    const meta = { id: 123 };

    logInfo(mockReq, message, meta);

    expect(mockReq.log.info).toHaveBeenCalledWith(meta, message);
  });

  it('should log info without metadata', () => {
    const message = 'Operation complete';

    logInfo(mockReq, message);

    expect(mockReq.log.info).toHaveBeenCalledWith({}, message);
  });

  it('should log warning with metadata', () => {
    const message = 'User not found';
    const meta = { id: 404 };

    logWarn(mockReq, message, meta);

    expect(mockReq.log.warn).toHaveBeenCalledWith(meta, message);
  });

  it('should log warning without metadata', () => {
    const message = 'Slow response';

    logWarn(mockReq, message);

    expect(mockReq.log.warn).toHaveBeenCalledWith({}, message);
  });
});