import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { windowClear } from '../../../test-utils/mocks/localStorage';
import { mockSuccessConfig } from '../../../test-utils/mocks/resultBlockMock';

import ResultBlock from './ResultBlock';
import { SuccessFetchAnswer } from '../../interfaces/types';

describe('Rendering tests for ResultBlock', () => {
  windowClear();

  it('Displays "no results" message when data array is empty', () => {
    const emptyConfig: SuccessFetchAnswer = {
      stat: 'ok',
      photos: {
        ...mockSuccessConfig.photos,
        photo: [],
        total: 0,
      },
    };

    localStorage.setItem('text', 'nothing');

    render(
      <ResultBlock config={emptyConfig} text="" heading="" crash={false} />
    );

    expect(
      screen.getByText(/0 results were found for request/i)
    ).toBeInTheDocument();
  });

  it('Renders correct number of items when data is provided', () => {
    localStorage.setItem('text', 'cats');

    render(
      <ResultBlock
        config={mockSuccessConfig}
        text=""
        heading=""
        crash={false}
      />
    );

    const cards = screen.getAllByRole('img');
    expect(cards.length).toBe(mockSuccessConfig.photos.photo.length);

    expect(
      screen.getByText(/results were found for request/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/cats/i)).toBeInTheDocument();
  });

  it('Shows loading state while fetching data', () => {
    const { container } = render(
      <ResultBlock config={null} text="" heading="" crash={false} />
    );
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});

describe('ResultBlock Data Display Tests', () => {
  it('Correctly displays item titles', () => {
    localStorage.setItem('text', 'photos');

    render(
      <ResultBlock
        config={mockSuccessConfig}
        text=""
        heading=""
        crash={false}
      />
    );

    for (const photo of mockSuccessConfig.photos.photo) {
      expect(screen.getByText(photo.title)).toBeInTheDocument();
    }
  });
});

describe('ResultBlock Error Handling Tests', () => {
  it('Displays error message when API call fails', () => {
    const errorMessage = '500 — Non-successful response';

    render(
      <ResultBlock config={errorMessage} text="" heading="" crash={false} />
    );

    expect(
      screen.getByText(`Something went wrong. Mistake:${errorMessage}`)
    ).toBeInTheDocument();
  });
});
