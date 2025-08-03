import { CardType } from '../interfaces/types';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, Item, removeItem } from './selectedItemsSlice';
import { RootState } from '../app/store';

export function Card({
  photoCard,
  showModal,
  currentSearch,
  setSearchParams,
  headingText,
}: CardType) {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) =>
    state.selectedItems.some((item: Item) => item.id === photoCard.id)
  );

  return (
    <div
      className="results-card"
      onClick={async (event) => {
        if (
          !(event.target as HTMLElement).classList.contains('card-checkbox')
        ) {
          showModal(true);
          currentSearch.push(['detail', photoCard.id]);
          setSearchParams(new URLSearchParams(currentSearch));
        }
      }}
    >
      <div>
        <img
          src={photoCard.url_l}
          className="results-card__image"
          alt={headingText ?? 'photo'}
        ></img>
      </div>
      <h5 className="card-description">{photoCard.title}</h5>
      <input
        type="checkbox"
        data-test-id="checkbox"
        onChange={() => {
          if (!selector) {
            dispatch(addItem(photoCard));
          } else {
            dispatch(removeItem(photoCard));
          }
        }}
        className="card-checkbox results-card__card-checkbox"
        checked={selector}
      ></input>
    </div>
  );
}
