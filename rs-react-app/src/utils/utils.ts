import { Item } from '../features/selectedItemsSlice';
import { SuccessFetchAnswerByID, Theme } from '../interfaces/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

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

export function getFileName(length: number) {
  return length === 1 ? `${length}_item` : `${length}_items`;
}

export function createCSV(headers: string[], rows: string[][]): string {
  const headerRow = headers.map((header) => `"${header}"`).join(',');
  const dataRows = rows.map((row) => {
    return row
      .map((cell) => {
        const cellValue = String(cell).replace(/"/g, '""');
        return `"${cellValue}"`;
      })
      .join(',');
  });
  return [headerRow, ...dataRows].join('\n');
}

export function startFileDownload(url: string, fileName: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getTheme(theme: Theme) {
  return theme === 'light' ? 'dark' : 'light';
}

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
) {
  let errorMessage = '';

  if (error && typeof error === 'object' && 'message' in error) {
    return error.message;
  }

  if (error && typeof error === 'object' && 'status' in error) {
    if (typeof error.data === 'string') {
      errorMessage = error.data;
    } else {
      errorMessage = `${String(error.status)}`;
    }
  }
  return errorMessage || 'Unknown mistake';
}

export function transformResponseFn(
  error: FetchBaseQueryError | SerializedError | undefined
) {
  return getErrorMessage(error) || 'Unknown mistake';
}

export function transformResponseFnById(
  response: SuccessFetchAnswerByID | undefined
) {
  if (!response || !response.photo) return undefined;
  return response.photo;
}
