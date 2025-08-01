import './SearchBlock.css';
import { AppProps } from '../../interfaces/types';
import { Button } from '../ui/button/Button';

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
        setLocalStorage(e);
      }}
    >
      <input
        type="search"
        className="search__input"
        value={text}
        onChange={handleChangeInput}
        placeholder="Введите текст"
      />

      <Button
        classname={`button search__button`}
        text={'Search'}
        type={'submit'}
      />
    </form>
  );
}
