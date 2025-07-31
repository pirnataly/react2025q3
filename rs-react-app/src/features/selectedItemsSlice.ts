import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});

export const { addItem, removeItem, clearItems } = items.actions;

export default items.reducer;
