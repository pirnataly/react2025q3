import * as React from 'react';
import './SearchBlock.css';
import { MyProps, MyState } from '../../interfaces/types';

class SearchBlock extends React.Component<MyProps, MyState> {
  public constructor(props: MyProps) {
    super(props);
  }

  render() {
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
          value={this.props.text}
          onChange={this.props.handleChangeInput}
          placeholder="Введите текст"
        />
        <button className="search__button" onClick={this.props.setLocalStorage}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchBlock;
