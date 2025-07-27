import { vi, beforeEach } from 'vitest';

export const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

export const mockHandleChangeInput = vi.fn();
export const mockSetLocalStorage = vi.fn();

export function windowClear() {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });
}
