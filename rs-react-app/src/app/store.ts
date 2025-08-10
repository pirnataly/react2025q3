import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsReducer } from '../features/selectedItemsSlice';
import { flickrApi } from '../service/flickrApi';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [flickrApi.reducerPath]: flickrApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flickrApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
