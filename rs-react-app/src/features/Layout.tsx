import './Layout.css';
import '../app/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getLayoutClass } from '../utils/utils';
import { clearItems } from './selectedItemsSlice';

export function Layout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems);

  return (
    <aside className={getLayoutClass(selectedItems)}>
      <span
        className={'layout-text'}
      >{`${selectedItems.length} items are selected`}</span>
      <button
        className={'button layout-button'}
        onClick={() => {
          dispatch(clearItems());
        }}
      >
        Unselect all
      </button>
      <button className={'button layout-button'}>Download</button>
    </aside>
  );
}
