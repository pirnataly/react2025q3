import { screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import {
  windowClear,
  localStorageMock,
} from '../test-utils/mocks/localStorage';
import { mockSuccessConfig } from '../test-utils/mocks/resultBlockMock';
import * as fetchModule from './service/request';
import { renderApp } from '../test-utils/renderApp';

windowClear();

describe('Integration tests ', () => {
  it(' Handles search term from localStorage on initial load', () => {
    localStorageMock.setItem('text', 'cats');
    renderApp();
    const input = screen.getByPlaceholderText('Введите текст');
    expect(input).toHaveValue('cats');
  });

  it('Makes initial API call on component mount', async () => {
    const fetchSpy = vi
      .spyOn(fetchModule, 'default')
      .mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'nature');
    renderApp();
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('nature');
    });
  });
});

describe('API Integration tests ', () => {
  it('Calls API with correct parameters', async () => {
    const fetchMock = vi
      .spyOn(fetchModule, 'default')
      .mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'flowers');
    renderApp();
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('flowers');
    });
  });

  it('Handles successful API responses', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'sky');
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/sky/i)).toBeInTheDocument();
    });
  });

  it('Handles API error responses', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(
      '500 — Non-successful response'
    );
    window.localStorage.setItem('text', 'fail');
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});

describe('State Management Test', () => {
  it('Updates component state based on API responses', async () => {
    window.localStorage.setItem('text', 'milk');
    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockSuccessConfig);
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/results were found/i)).toBeInTheDocument();
    });
  });

  it('Manages search term state correctly', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockSuccessConfig);
    window.localStorage.setItem('text', 'new-term');
    renderApp();
    await waitFor(() => {
      expect(screen.getByDisplayValue('new-term')).toBeInTheDocument();
    });
  });
});

describe('User Interaction Tests', () => {
  it('should trim whitespace from search input before saving', () => {
    renderApp();
    const input = screen.getByPlaceholderText('Введите текст');
    fireEvent.change(input, { target: { value: '   react test   ' } });
    fireEvent.click(screen.getByText('Search'));
    expect(localStorage.getItem('text')).toBe('react test');
  });
});
