import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import React from 'react';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';

export function renderWithRouter(component: () => React.JSX.Element) {
  return render(
    <BrowserRouter>
      <Provider store={store}>{component()}</Provider>
    </BrowserRouter>
  );
}
