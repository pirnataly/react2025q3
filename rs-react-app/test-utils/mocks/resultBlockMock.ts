import { Photo, Photos, SuccessFetchAnswer } from '../../src/interfaces/types';
import { vi } from 'vitest';

export const mockPhotos: Photo[] = [
  {
    farm: 66,
    height_l: 1024,
    id: '1',
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    owner: 'owner1',
    secret: 'abc123',
    server: '65535',
    title: 'Photo 1',
    url_l: 'https://example.com/photo1_l.jpg',
    width_l: 768,
  },
  {
    farm: 67,
    height_l: 800,
    id: '2',
    isfamily: 1,
    isfriend: 0,
    ispublic: 1,
    owner: 'owner2',
    secret: 'def456',
    server: '65536',
    title: 'Photo 2',
    url_l: 'https://example.com/photo2_l.jpg',
    width_l: 1200,
  },
  {
    farm: 68,
    height_l: 600,
    id: '3',
    isfamily: 0,
    isfriend: 1,
    ispublic: 1,
    owner: 'owner3',
    secret: 'ghi789',
    server: '65537',
    title: 'Photo 3',
    url_l: 'https://example.com/photo3_l.jpg',
    width_l: 900,
  },
];

export const mockPhotosData: Photos = {
  page: 1,
  pages: 10,
  perpage: 10,
  total: 100,
  photo: mockPhotos,
};

export const mockSuccessConfig: SuccessFetchAnswer = {
  photos: mockPhotosData,
  stat: 'ok',
};

export const mockPhotoById = {
  id: '1',
  title: { _content: 'Mock title' },
  owner: { realname: 'Mock author' },
  secret: 'abc',
  server: '123',
  views: '10',
  dates: { taken: '2022-01-01' },
};

export const mockChangePage = vi.fn();
export const mockSetSearchParams = vi.fn();
export const mockShowModal = vi.fn();
export const mockUrlSearchParams = new URLSearchParams();
