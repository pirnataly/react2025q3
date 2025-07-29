import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from './error-boundary/ErrorBoundary';
import { Fallback } from './error-boundary/Fallback';
import { BrowserRouter } from 'react-router';
import RouterComponent from './service/router/RouterComponent';
import { Provider } from 'react-redux';
import { store } from './app/store';

export function renderApp(): void {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary fallback={<Fallback />}>
          <BrowserRouter>
            <Provider store={store}>
              <RouterComponent />
            </Provider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
}

renderApp();
