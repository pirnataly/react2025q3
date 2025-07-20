import { describe, it, vi, beforeEach, expect } from 'vitest';
import * as mainModule from './main';
import ReactDOM from 'react-dom/client';

describe('main.tsx', () => {
  let rootDiv: HTMLDivElement;

  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);
  });

  it('calls createRoot and renders App inside ErrorBoundary', () => {
    const mockRender = vi.fn();
    const mockCreateRoot = vi.fn().mockReturnValue({ render: mockRender });
    ReactDOM.createRoot = mockCreateRoot;

    mainModule.renderApp();

    expect(mockCreateRoot).toHaveBeenCalledWith(rootDiv);
    expect(mockRender).toHaveBeenCalled();
  });

  it('logs error when root element is missing', () => {
    document.body.innerHTML = ''; // удалить #root
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mainModule.renderApp();
    expect(consoleSpy).toHaveBeenCalledWith('Root element not found');
  });
});
