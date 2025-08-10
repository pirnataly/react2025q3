import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { mockSuccessConfig } from '../../test-utils/mocks/resultBlockMock';
import RouterComponent from './../service/router/RouterComponent';
import { renderWithRouter } from '../../test-utils/renderWithRouter';
import {
  localStorageMock,
  windowClear,
} from '../../test-utils/mocks/localStorage';
import * as flickrApiHooks from '../service/flickrApi';

vi.mock('../service/flickrApi', async (mod) => {
  const actual = (await mod()) as object;
  return {
    ...actual,
    useFetchResultsQuery: vi.fn(),
  };
});

windowClear();

describe('Integration tests ', () => {
  it(' Handles search term from localStorage on initial load', () => {
    localStorageMock.setItem('text', 'cats');
    (
      flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockSuccessConfig,
      isFetching: false,
      error: undefined,
    });
    renderWithRouter(RouterComponent);
    const input = screen.getByPlaceholderText('Введите текст');
    expect(input).toHaveValue('cats');
  });

  it('Makes initial API call on component mount', async () => {
    (
      flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockSuccessConfig,
      isFetching: false,
      error: undefined,
    });
    window.localStorage.setItem('text', 'nature');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(flickrApiHooks.useFetchResultsQuery).toHaveBeenCalledWith({
        inputText: 'nature',
        page: 1,
      });
    });
  });
});

it('Handles successful API responses', async () => {
  (
    flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
  ).mockReturnValue({
    data: mockSuccessConfig,
    isFetching: false,
    error: undefined,
  });
  window.localStorage.setItem('text', 'sky');
  renderWithRouter(RouterComponent);
  await waitFor(() => {
    expect(screen.getByText(/sky/i)).toBeInTheDocument();
  });
});

it('Handles API error responses', async () => {
  (
    flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
  ).mockReturnValue({
    data: undefined,
    isFetching: false,
    error: 'TypeError: Failed to fetch',
  });

  window.localStorage.setItem('text', 'fail');
  renderWithRouter(RouterComponent);

  await waitFor(() => {
    expect(screen.getByText(/TypeError: Failed to fetch/i)).toBeInTheDocument();
  });
});

describe('State Management Test', () => {
  it('Updates component state based on API responses', async () => {
    window.localStorage.setItem('text', 'milk');
    (
      flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockSuccessConfig,
      isFetching: false,
      error: undefined,
    });
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByText(/results were found/i)).toBeInTheDocument();
    });
  });

  it('Manages search term state correctly', async () => {
    (
      flickrApiHooks.useFetchResultsQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockSuccessConfig,
      isFetching: false,
      error: undefined,
    });
    window.localStorage.setItem('text', 'new-term');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByDisplayValue('new-term')).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    it('should trim whitespace from search input before saving', () => {
      renderWithRouter(RouterComponent);
      const input = screen.getByPlaceholderText('Введите текст');
      fireEvent.change(input, { target: { value: '   react test   ' } });
      fireEvent.click(screen.getByText('Search'));
      expect(localStorage.getItem('text')).toBe('react test');
    });

    it('updates URL search params when page is changed', async () => {
      renderWithRouter(RouterComponent);
      const pageButton = await screen.findByRole('button', { name: /2/i });
      fireEvent.click(pageButton);
      await waitFor(() => {
        expect(window.location.search).toContain('page=2');
      });
    });
  });
});
