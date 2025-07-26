import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import RouterComponent from '../src/service/router/RouterComponent';

export function renderApp() {
  return render(
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}
