import * as React from 'react';

export type AppState = {
  text: string;
  heading: string;
  config: null | SuccessFetchAnswer | 'bad' | string;
  crash: boolean;
};

export type ConfigType = AppState['config'];

export type AppProps = {
  text: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLocalStorage: () => void;
};

export type ResultProps = Pick<AppState, 'config'>;

export type Photo = {
  farm: number;
  height_l: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
  url_l: string;
  width_l: number;
};

export type Photos = {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
};

export type SuccessFetchAnswer = { photos: Photos; stat: 'ok' };

export type CardProps = {
  photos: Photo[];
  headingText: string | null;
};
