import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCSV, getFileName, startFileDownload } from '../utils/utils';

export type Item = {
  id: string;
  url_l: string;
  title: string;
};

type selectedItemsState = Item[];

const initialState: selectedItemsState = [];

const items = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (
      state,
      { payload: { id, title, url_l } }: PayloadAction<Item>
    ) => {
      state.push({ id, title, url_l });
    },
    removeItem: (state, { payload: { id } }: PayloadAction<Item>) => {
      return state.filter((item) => item.id !== id);
    },
    clearItems: () => {
      return [];
    },

    downloadItems: (state) => {
      if (!state.length) {
        return;
      } else {
        const length: number = state.length;
        const headers = ['ID', 'Title', 'Image URL'];
        const rows = state.map((item) => [item.id, item.title, item.url_l]);
        const csvContent = createCSV(headers, rows);
        const blob = new Blob([csvContent], {
          type: 'text/csv;charset=utf-8;',
        });
        const fileName = getFileName(length);
        const url = URL.createObjectURL(blob);
        startFileDownload(url, fileName);
      }
    },
  },
});

export const { addItem, removeItem, clearItems, downloadItems } = items.actions;

export const selectedItemsReducer = items.reducer;
