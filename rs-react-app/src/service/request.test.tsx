import { describe, expect, it, vi, beforeEach } from 'vitest';
import fetchResults from './request';

window.fetch = vi.fn();

describe('fetchResults', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns answer when fetch is successful', () => {
    const mockJson = vi.fn().mockResolvedValue({ stat: 'ok' });
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: mockJson,
    });

    fetchResults('cat').then((res) => {
      expect(res).toEqual({ stat: 'ok' });
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('returns error string when response is not ok', () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
    });

    fetchResults('dog').then((res) => {
      expect(res).toBe('500 — Non-successful response');
    });
  });

  it('returns error message after 3 failed retries', () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new TypeError('Failed permanently');
    });

    fetchResults('fail').then((result) => {
      expect(result).toBe('Failed permanently');
      expect(fetch).toHaveBeenCalledTimes(4);
    });
  });

  it('returns undefined for null input', () => {
    fetchResults(null, 1).then((result) => {
      expect(result).toBeUndefined();
      expect(fetch).not.toHaveBeenCalled();
    });
  });
});
