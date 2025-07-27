import { render, screen, waitFor } from '@testing-library/react';
import ModalContent from './ModalContent';
import { vi } from 'vitest';
import * as requestService from '../../../service/requestId';
import useFetching from '../../../hooks/useFetching';
import { mockPhoto } from '../../../../test-utils/mocks/modalMocks';

vi.mock('../../../service/requestId', () => ({
  fetchById: vi.fn(),
}));

vi.mock('../../../hooks/useFetching');

describe('ModalContent', () => {
  const photoId = '123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает Loader при isPhotoLoading === true', () => {
    (useFetching as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      true,
      '',
    ]);

    render(<ModalContent id={photoId} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('отображает сообщение об ошибке при наличии errorMessage', () => {
    (useFetching as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      false,
      'Ошибка при загрузке',
    ]);

    render(<ModalContent id={photoId} />);
    expect(screen.getByText('Ошибка при загрузке')).toBeInTheDocument();
  });

  it('отображает данные фото при успешной загрузке', async () => {
    (requestService.fetchById as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockPhoto
    );

    (useFetching as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (callback) => {
        return [(id: string) => callback(id), false, ''];
      }
    );

    render(<ModalContent id={photoId} />);

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
    (requestService.fetchById as ReturnType<typeof vi.fn>).mockResolvedValue(
      brokenPhoto
    );

    (useFetching as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (callback) => {
        return [(id: string) => callback(id), false, ''];
      }
    );

    render(<ModalContent id={photoId} />);

    await waitFor(() => {
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute(
        'src',
        'https://live.staticflickr.com/65535/54650369805_293c7be4a1_b.jpg'
      );
    });
  });
});
