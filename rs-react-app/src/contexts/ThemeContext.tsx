import { createContext } from 'react';
import { ThemeContextType } from '../interfaces/types';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});
