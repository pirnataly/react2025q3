import { Item } from '../features/selectedItemsSlice';

export function getPagesArray(start: number, end: number) {
  const step = 1;
  return Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export function getFrom(page: number) {
  let result;
  if (page <= 20) {
    result = 1;
  } else if (page % 20 !== 0) {
    result = Math.trunc(page / 20) * 20 + 1;
  } else {
    result = (Math.trunc(page / 20) - 1) * 20 + 1;
  }
  return result;
}

export function getMaxPageNumber(totalPages: number, perPageNumber: number) {
  return perPageNumber > totalPages ? totalPages : perPageNumber;
}

export function getPrevPagesArray(currentPages: number[]) {
  return currentPages.map((item) => item - 20);
}

export function getNextPagesArray(currentPages: number[], total: number) {
  let arr: [] | number[];
  if (total === 0) {
    arr = [];
  } else {
    arr = currentPages.map((item) => item + 20);
  }
  return arr;
}

export function getLayoutClass(items: Item[]) {
  return items.length
    ? 'flyout app__flyout'
    : 'flyout app__flyout app__flyout_none';
}

export function getEndOfAmount(length: number): string {
  let result: string;
  switch (length) {
    case 0:
      result = 'nothing is';
      break;
    case 1:
      result = `${length} item is`;
      break;
    default:
      result = `${length} items are`;
  }
  return result;
}
