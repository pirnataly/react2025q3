import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import NotFound from './NotFound';
import { renderWithRouter } from '../../../test-utils/renderWithRouter';

describe('NotFound rendering tests ', () => {
  it('renders heading', () => {
    renderWithRouter(NotFound);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/^404.Not Found$/);
  });

  it('renders paragraph', () => {
    renderWithRouter(NotFound);
    const p = screen.getByRole('paragraph');
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(/^This is not the page you are looking for$/);
  });
});
