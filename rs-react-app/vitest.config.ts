import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    // coverage: {
    //   enabled: true,
    //   provider: 'c8', // важно! 'v8' — только для Node >=16.14 и без jsdom
    //   include: ['src/**/*.{js,jsx,ts,tsx}'],
    //   exclude: [
    //     'src/**/*.test.{js,jsx,ts,tsx}',
    //     'src/**/*.spec.{js,jsx,ts,tsx}',
    //     'src/index.{js,jsx,ts,tsx}',
    //     'src/setupTests.{js,ts}',
    //     'src/**/*.d.ts'
    //   ],
    //   reporter: ['text', 'json', 'html'] // это работает
    // }
  },
});
