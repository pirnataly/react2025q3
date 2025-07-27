import { expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  mockPhotos,
  mockSetSearchParams,
  mockShowModal,
  mockSuccessConfig,
  mockUrlSearchParams,
} from '../../../test-utils/mocks/resultBlockMock';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { Cards } from './Cards';

describe('Rendering test for Cards', () => {
  it('Renders correct number of items when photos is provided', () => {
    render(
      <Cards
        headingText={null}
        photos={mockPhotos}
        showModal={mockShowModal}
        setSearchParams={mockSetSearchParams}
        params={mockUrlSearchParams}
      />
    );
    const cards = screen.getAllByRole('img');
    expect(cards.length).toBe(mockPhotos.length);
  });

  it('Renders correct card-description', () => {
    render(
      <Cards
        headingText={null}
        photos={mockPhotos}
        showModal={mockShowModal}
        setSearchParams={mockSetSearchParams}
        params={mockUrlSearchParams}
      />
    );

    for (const photo of mockSuccessConfig.photos.photo) {
      expect(screen.getByText(photo.title)).toBeInTheDocument();
    }
  });
});
