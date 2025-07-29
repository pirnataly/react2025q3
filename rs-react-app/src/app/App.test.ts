import { screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { mockSuccessConfig } from '../../test-utils/mocks/resultBlockMock';
import * as fetchModule from './../service/request';
import RouterComponent from './../service/router/RouterComponent';
import { renderWithRouter } from '../../test-utils/renderWithRouter';
import {
  localStorageMock,
  windowClear,
} from '../../test-utils/mocks/localStorage';

windowClear();

describe('Integration tests ', () => {
  it(' Handles search term from localStorage on initial load', () => {
    localStorageMock.setItem('text', 'cats');
    renderWithRouter(RouterComponent);
    const input = screen.getByPlaceholderText('Введите текст');
    expect(input).toHaveValue('cats');
  });

  it('Makes initial API call on component mount', async () => {
    const fetchSpy = vi
      .spyOn(fetchModule, 'default')
      .mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'nature');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('nature', 1);
    });
  });
});

describe('API Integration tests ', () => {
  it('Calls API with correct parameters', async () => {
    const fetchMock = vi
      .spyOn(fetchModule, 'default')
      .mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'flowers');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('flowers', 1);
    });
  });

  it('Handles successful API responses', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'sky');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByText(/sky/i)).toBeInTheDocument();
    });
  });

  it('Handles API error responses', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(
      '500 — Non-successful response'
    );
    window.localStorage.setItem('text', 'fail');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});

describe('State Management Test', () => {
  it('Updates component state based on API responses', async () => {
    window.localStorage.setItem('text', 'milk');
    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockSuccessConfig);
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByText(/results were found/i)).toBeInTheDocument();
    });
  });

  it('Manages search term state correctly', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'new-term');
    renderWithRouter(RouterComponent);
    await waitFor(() => {
      expect(screen.getByDisplayValue('new-term')).toBeInTheDocument();
    });
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
