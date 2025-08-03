import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Flyout } from './Flyout';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { addItem } from './selectedItemsSlice';

test('dispatch calls clearItems by clicking "Unselect all" button', async () => {
  store.dispatch(addItem({ id: '1', title: 'Test', url_l: 'url' }));

  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  const button = screen.getByRole('button', { name: /Unselect all/i });
  await userEvent.click(button);

  expect(store.getState().selectedItems).toEqual([]);
});
