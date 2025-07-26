import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils/renderWithRouter';
import About from './About';

describe('Tests for about page', () => {
  it('Should have 3 links in navigation', () => {
    renderWithRouter(About);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);
  });
});
