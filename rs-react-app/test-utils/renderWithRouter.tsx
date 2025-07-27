import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import React from 'react';

export function renderWithRouter(component: () => React.JSX.Element) {
  return render(<BrowserRouter>{component()}</BrowserRouter>);
}
