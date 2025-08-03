import ReactDOM from 'react-dom/client';
import React from 'react';
import { ErrorBoundary } from './error-boundary/ErrorBoundary';
import { Fallback } from './error-boundary/Fallback';
import { Provider } from 'react-redux';
import { store } from './app/store';
import RouterComponent from './service/router/RouterComponent';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './contexts/ThemeProvider';

export function renderApp(): void {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary fallback={<Fallback />}>
          <BrowserRouter>
            <ThemeProvider>
              <Provider store={store}>
                <RouterComponent />
              </Provider>
            </ThemeProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
}

renderApp();
