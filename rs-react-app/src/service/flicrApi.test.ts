import { describe, expect, it, vi } from 'vitest';
import * as flickrApiHooks from '../service/flickrApi';
import { mockSuccessConfig } from '../../test-utils/mocks/resultBlockMock';
import { renderWithRouter } from '../../test-utils/renderWithRouter';
import RouterComponent from './router/RouterComponent';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { windowClear } from '../../test-utils/mocks/localStorage';
import { transformResponseFnById, transformResponseFn } from '../utils/utils';
import { mockPhoto } from '../../test-utils/mocks/modalMocks';
import { SuccessFetchAnswerByID } from '../interfaces/types';

windowClear();
vi.mock('../service/flickrApi', async (mod) => {
  const actual = (await mod()) as object;
  return {
    ...actual,
    useFetchResultsQuery: vi.fn(),
  };
});

describe('Tests for cashing behavior', () => {
  it('uses cached data when inputText and page do not change', async () => {
    const mockRefetch = vi.fn();

    (
      flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockSuccessConfig,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });
    window.localStorage.setItem('text', 'flowers');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByText(/results were found/i)).toBeInTheDocument();
    });
    renderWithRouter(RouterComponent);
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  it('invalidates cache and triggers refetch on refresh', async () => {
    const mockRefetch = vi.fn();

    (
      flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockSuccessConfig,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });

    window.localStorage.setItem('text', 'sun');

    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByText(/results were found/i)).toBeInTheDocument();
    });
    const refreshButton = screen.getByRole('button', {
      name: /refresh this page/i,
    });
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});

describe('transformResponse and transformError tests', () => {
  it('returns undefined if response is undefined', () => {
    const result = transformResponseFnById(undefined);
    expect(result).toBeUndefined();
  });

  it('returns photo if response.photo exists', () => {
    const response = { photo: mockPhoto, stat: 'ok' } as SuccessFetchAnswerByID;
    const result = transformResponseFnById(response);
    expect(result).toEqual(mockPhoto);
  });

  it('returns "Unknown mistake" if error is undefined', () => {
    const error = transformResponseFn(undefined);
    expect(error).toBe('Unknown mistake');
  });
});
