import * as React from 'react';
import { URLSearchParamsInit } from 'react-router';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type AppState = {
  text: string;
  heading: string;
  config: SuccessFetchAnswer | undefined;
  crash: boolean;
};

export type AppProps = {
  text: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLocalStorage: (e: React.FormEvent) => void;
};

export type ResultProps = {
  changePage: (page: number) => void;
  page: number;
  result: AppState['config'];
  isPhotoLoading: boolean;
  showModal: (arg: boolean) => void;
  setSearchParams: (arg: URLSearchParamsInit) => void;
  params: URLSearchParams;
  errorMessage: FetchBaseQueryError | SerializedError | undefined | string;
  headingText: string;
};

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

export type SuccessFetchAnswerByID = { photo: PhotoByIdType; stat: 'ok' };

export type CardProps = {
  photos: Photo[];
  headingText: string | null;
  showModal: (arg: boolean) => void;
  setSearchParams: (arg: URLSearchParamsInit) => void;
  params: URLSearchParams;
};

export type PaginationType = {
  pages: number;
  page: number;
  changePage: (p: number) => void;
};

export type ModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  setSearchParams: (arg: URLSearchParamsInit) => void;
  id: string | null;
  params: URLSearchParams;
};

export type ModalComponent = Pick<ModalProps, 'id'>;

export type PhotoByIdType = {
  dates: {
    taken: string;
  };
  owner: {
    realname: string;
  };
  id: string;
  secret: string;
  server: string;
  title: { _content: string };
  views: string;
};

export type CardType = Pick<
  CardProps,
  'showModal' | 'setSearchParams' | 'headingText'
> & { currentSearch: [string, string][]; photoCard: Photo };

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
};

export type FetchResultsArgs = {
  inputText: string;
  page?: number;
};

export type IdType = string | null;
