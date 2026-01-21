import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { windowClear } from '../../../test-utils/mocks/localStorage';
import {
  mockChangePage,
  mockSetSearchParams,
  mockShowModal,
  mockSuccessConfig,
  mockUrlSearchParams,
} from '../../../test-utils/mocks/resultBlockMock';

import ResultBlock from './ResultBlock';
import { SuccessFetchAnswer } from '../../interfaces/types';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

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
      <Provider store={store}>
        <ResultBlock
          result={emptyConfig}
          page={1}
          changePage={mockChangePage}
          showModal={mockShowModal}
          setSearchParams={mockSetSearchParams}
          errorMessage={''}
          headingText="headingText"
          isPhotoLoading={false}
          params={mockUrlSearchParams}
        />
      </Provider>
    );

    expect(
      screen.getByText(/0 results were found for request/i)
    ).toBeInTheDocument();
  });

  it('Renders correct number of items when data is provided', () => {
    localStorage.setItem('text', 'cats');

    render(
      <Provider store={store}>
        <ResultBlock
          result={mockSuccessConfig}
          page={1}
          changePage={mockChangePage}
          showModal={mockShowModal}
          setSearchParams={mockSetSearchParams}
          errorMessage={''}
          isPhotoLoading={false}
          headingText="cats"
          params={mockUrlSearchParams}
        />
      </Provider>
    );

    const cards = screen.getAllByRole('img');
    expect(cards.length).toBe(mockSuccessConfig.photos.photo.length);

    expect(
      screen.getByText(/results were found for request/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Photo 3/i)).toBeInTheDocument();
  });

  it('Shows loading state while fetching data', () => {
    render(
      <ResultBlock
        changePage={vi.fn()}
        result={undefined}
        page={1}
        showModal={vi.fn()}
        setSearchParams={vi.fn()}
        isPhotoLoading={true}
        params={mockUrlSearchParams}
        errorMessage={undefined}
        headingText="test"
      />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});

describe('ResultBlock Data Display Tests', () => {
  it('Correctly displays item titles', () => {
    localStorage.setItem('text', 'photos');

    render(
      <Provider store={store}>
        <ResultBlock
          result={mockSuccessConfig}
          page={1}
          changePage={mockChangePage}
          showModal={mockShowModal}
          setSearchParams={mockSetSearchParams}
          errorMessage={''}
          isPhotoLoading={false}
          headingText={'headingText'}
          params={mockUrlSearchParams}
        />
      </Provider>
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
      <Provider store={store}>
        <ResultBlock
          result={undefined}
          headingText={'headingText'}
          page={1}
          changePage={mockChangePage}
          showModal={mockShowModal}
          setSearchParams={mockSetSearchParams}
          errorMessage={errorMessage}
          isPhotoLoading={false}
          params={mockUrlSearchParams}
        />
      </Provider>
    );

    expect(
      screen.getByText(`Something went wrong. Mistake:${errorMessage}`)
    ).toBeInTheDocument();
  });
});
