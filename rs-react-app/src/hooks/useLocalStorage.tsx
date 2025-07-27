import { useState } from 'react';

export function useLocalStorage(key: string) {
  return useState(localStorage.getItem(key) ?? '');
}
