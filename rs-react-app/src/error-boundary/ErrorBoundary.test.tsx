import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, expect } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import Fallback from './Fallback';

describe('Error Boundary Tests', () => {
  it('Catches and handles JavaScript errors in child components', () => {
    const ProblemChild = () => {
      throw new Error('Test Error');
    };

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Mistake from Error Boundary/i)
    ).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('Displays fallback UI when error occurs', () => {
    const ProblemChild = () => {
      throw new Error('Test error display');
    };

    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Mistake from Error Boundary/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Please reload the window/i)).toBeInTheDocument();
  });
});
