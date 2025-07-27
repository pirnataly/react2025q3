import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchById } from './requestId';
import type { PhotoByIdType } from '../interfaces/types';

const mockPhoto: PhotoByIdType = {
  id: '123',
  secret: 'secret',
  server: 'server',
  title: { _content: 'Test title' },
  dates: { taken: '2024-01-01' },
  owner: { realname: 'John Doe' },
  views: '100',
};

describe('fetchById', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns photo data when API call is successful', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ photo: mockPhoto }),
    });

    const result = await fetchById('123');
    expect(fetch).toHaveBeenCalledOnce();
    expect(result).toEqual(mockPhoto);
  });

  it('returns "bad" when API response status is not 200', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      status: 500,
    });

    const result = await fetchById('123');
    expect(result).toBe('bad');
  });

  it('returns "bad" when id is null', async () => {
    const result = await fetchById(null);
    expect(result).toBe('bad');
  });
});
