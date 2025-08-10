import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FetchResultsArgs,
  IdType,
  PhotoByIdType,
  SuccessFetchAnswer,
} from '../interfaces/types';
import { transformResponseFn, transformResponseFnById } from '../utils/utils';

export const flickrApi = createApi({
  reducerPath: 'flickrApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.flickr.com/services/rest/',
  }),
  tagTypes: ['Cards', 'Card'],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    fetchResults: builder.query<
      SuccessFetchAnswer | undefined,
      FetchResultsArgs
    >({
      query: ({ inputText, page = 1 }) => ({
        url: '',
        params: {
          method: 'flickr.photos.search',
          api_key: 'd50b74cc2abc8ca99a668840bd5db3e4',
          tags: inputText,
          extras: 'url_l',
          format: 'json',
          nojsoncallback: '1',
          per_page: '20',
          page: page.toString(),
          content_types: '0',
          privacy_filter: '1',
        },
      }),
      transformErrorResponse: transformResponseFn,
      providesTags: (_result, _error, { inputText, page }) => [
        { type: 'Cards', id: `${inputText}_${page}` },
      ],
    }),
    fetchById: builder.query<PhotoByIdType | undefined, IdType>({
      query: (id) => ({
        url: '',
        params: {
          method: 'flickr.photos.getInfo',
          api_key: 'd50b74cc2abc8ca99a668840bd5db3e4',
          photo_id: id,
          secret: '26afe18e55c9c647',
          format: 'json',
          nojsoncallback: '1',
        },
      }),
      transformResponse: transformResponseFnById,
      providesTags: (_, __, id) => (id ? [{ type: 'Card', id }] : []),
    }),
  }),
});

export const { useFetchResultsQuery, useFetchByIdQuery } = flickrApi;
