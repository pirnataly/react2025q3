import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { mockPhotos } from '../../test-utils/mocks/resultBlockMock';
import { expect, test, vi } from 'vitest';

const mockPhotoCard = mockPhotos[0];

const mockShowModal = vi.fn();
const mockSetSearchParams = vi.fn();

test('open modal and add search parameters by clicking on a card', async () => {
  render(
    <Provider store={store}>
      <Card
        photoCard={mockPhotoCard}
        showModal={mockShowModal}
        currentSearch={[]}
        setSearchParams={mockSetSearchParams}
        headingText="Test"
      />
    </Provider>
  );

  const card = screen.getByRole('img');
  await userEvent.click(card);

  expect(mockShowModal).toHaveBeenCalledWith(true);
  expect(mockSetSearchParams).toHaveBeenCalled();
});
