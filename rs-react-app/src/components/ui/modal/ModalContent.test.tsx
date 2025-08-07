import { render, screen, waitFor } from '@testing-library/react';
import ModalContent from './ModalContent';
import { vi } from 'vitest';
import { mockPhoto } from '../../../../test-utils/mocks/modalMocks';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';

import * as flickrApiHooks from '../../../service/flickrApi';

vi.mock('../../../service/flickrApi', async (mod) => {
  const actual = (await mod()) as object;
  return {
    ...actual,
    useFetchByIdQuery: vi.fn(),
  };
});

describe('ModalContent', () => {
  const photoId = '123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает Loader при isPhotoLoading === true', () => {
    (
      flickrApiHooks.useFetchByIdQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: undefined,
      isFetching: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <ModalContent id="123" />
      </Provider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('отображает данные фото при успешной загрузке', async () => {
    (
      flickrApiHooks.useFetchByIdQuery as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockPhoto,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <ModalContent id={photoId} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByAltText(photoId)).toHaveAttribute(
        'src',
        'https://live.staticflickr.com/456/123_abc_b.jpg'
      );
      expect(screen.getByText(/Title: Test Photo/)).toBeInTheDocument();
      expect(screen.getByText(/date: 2025-01-01/)).toBeInTheDocument();
      expect(screen.getByText(/author: Jane Doe/)).toBeInTheDocument();
      expect(screen.getByText(/views: 999/)).toBeInTheDocument();
    });
  });

  it('показывает изображение-заглушку, если getUrl возвращает undefined', async () => {
    const brokenPhoto = { ...mockPhoto, server: '', id: '', secret: '' };
    (
      flickrApiHooks.useFetchByIdQuery as ReturnType<typeof vi.fn>
    ).mockResolvedValue(brokenPhoto);
    render(
      <Provider store={store}>
        <ModalContent id={photoId} />
      </Provider>
    );

    await waitFor(() => {
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute(
        'src',
        'https://live.staticflickr.com/65535/54650369805_293c7be4a1_b.jpg'
      );
    });
  });
});
