import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Item = {
  id: string;
  url_l: string;
  title: string;
};

type selectedItemsState = {
  selectedItems: Item[];
};

const initialState: selectedItemsState = {
  selectedItems: [],
};

const items = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (
      state,
      { payload: { id, title, url_l } }: PayloadAction<Item>
    ) => {
      state.selectedItems.push({ id, title, url_l });
    },
    removeItem: (state, { payload: { id } }: PayloadAction<Item>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== id
      );
    },
    clearItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = items.actions;

export default items.reducer;
