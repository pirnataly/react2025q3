import './Flyout.css';
import '../app/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getEndOfAmount, getLayoutClass } from '../utils/utils';
import { clearItems } from './selectedItemsSlice';
import { Button } from '../components/ui/button/Button';

export function Flyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems);

  return (
    <aside className={getLayoutClass(selectedItems)}>
      <span
        className={'flyout-text'}
      >{`${getEndOfAmount(selectedItems.length)} selected`}</span>
      <Button
        text="Unselect all"
        classname="button flyout-button"
        type="button"
        onclickFunction={() => {
          dispatch(clearItems());
        }}
      />
      <Button classname="button flyout-button" text="Download" />
    </aside>
  );
}
