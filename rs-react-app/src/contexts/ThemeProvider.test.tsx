import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { windowClear } from '../../test-utils/mocks/localStorage';
import { Theme } from '../interfaces/types';
import { ThemeProvider } from './ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import RouterComponent from '../service/router/RouterComponent';
import { BrowserRouter } from 'react-router';
import { defineMatchMedia } from '../../test-utils/mocks/themeProviderMocks';
import App from '../app/App';
import userEvent from '@testing-library/user-event';

describe('ThemeProvider tests ', () => {
  windowClear();
  beforeAll(defineMatchMedia);

  it('renders button with "light theme" textContent when theme is dark', () => {
    const testTheme: Theme = 'dark';
    window.localStorage.setItem('theme', testTheme);
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <RouterComponent />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    );
    const switchButton = screen.getByText('light theme');
    expect(switchButton).toBeInTheDocument();
  });

  it('renders button with "light theme" textContent when localstorage does not have theme and default system theme is dark', () => {
    window.localStorage.removeItem('theme');
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <RouterComponent />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    );
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const switchButton = screen.getByText('light theme');
    if (media) {
      expect(switchButton).toBeInTheDocument();
    } else {
      expect(switchButton).not.toBeInTheDocument();
    }
  });

  it('switch theme by clicking on button', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    );

    const toggleBtn = screen.getByRole('button', { name: /light theme/i });
    expect(toggleBtn).toBeInTheDocument();

    await userEvent.click(toggleBtn);
    expect(
      screen.getByRole('button', { name: /dark theme/i })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /dark theme/i }));
    expect(
      screen.getByRole('button', { name: /light theme/i })
    ).toBeInTheDocument();
  });
});
