import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  addItem,
  removeItem,
  clearItems,
  downloadItems,
  selectedItemsReducer,
} from './selectedItemsSlice';
import { createCSV, getFileName, startFileDownload } from '../utils/utils';
import type { Item } from './selectedItemsSlice';
import { windowClear } from '../../test-utils/mocks/localStorage';

vi.mock('../utils/utils', () => ({
  createCSV: vi.fn(() => 'csv-content'),
  getFileName: vi.fn(() => 'file.csv'),
  startFileDownload: vi.fn(),
}));

describe('selectedItemsSlice', () => {
  const item1: Item = { id: '1', title: 'Title 1', url_l: 'url1' };
  const item2: Item = { id: '2', title: 'Title 2', url_l: 'url2' };
  windowClear();
  beforeEach(() => {
    window.URL.createObjectURL = vi.fn(() => 'blob:mocked-url');
  });

  it('addItem add element into empty array', () => {
    const nextState = selectedItemsReducer([], addItem(item1));
    expect(nextState).toEqual([item1]);
  });

  it('removeItem remove the element', () => {
    const state = [item1, item2];
    const nextState = selectedItemsReducer(state, removeItem(item1));
    expect(nextState).toEqual([item2]);
  });

  it('clearItems clear list', () => {
    const state = [item1, item2];
    const nextState = selectedItemsReducer(state, clearItems());
    expect(nextState).toEqual([]);
  });

  it('downloadItems does not start downloading, if list is empty', () => {
    const state: Item[] = [];
    selectedItemsReducer(state, downloadItems());
    expect(createCSV).not.toHaveBeenCalled();
    expect(startFileDownload).not.toHaveBeenCalled();
  });

  it('downloadItems calls utils if there are elements', () => {
    const state: Item[] = [item1, item2];
    selectedItemsReducer(state, downloadItems());
    expect(createCSV).toHaveBeenCalledWith(
      ['ID', 'Title', 'Image URL'],
      [
        ['1', 'Title 1', 'url1'],
        ['2', 'Title 2', 'url2'],
      ]
    );
    expect(getFileName).toHaveBeenCalledWith(2);
    expect(startFileDownload).toHaveBeenCalledWith(
      expect.any(String),
      'file.csv'
    );
  });
});
