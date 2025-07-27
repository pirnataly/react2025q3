import './SearchBlock.css';
import { AppProps } from '../../interfaces/types';

export function SearchBlock({
  text,
  handleChangeInput,
  setLocalStorage,
}: AppProps) {
  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="search"
        className="search__input"
        value={text}
        onChange={handleChangeInput}
        placeholder="Введите текст"
      />
      <button className="search__button" onClick={setLocalStorage}>
        Search
      </button>
    </form>
  );
}
