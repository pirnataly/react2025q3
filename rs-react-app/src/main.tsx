import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './error-boundary/ErrorBoundary';
import Fallback from './error-boundary/Fallback';

export function renderApp(): void {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary fallback={<Fallback />}>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
}
renderApp();
