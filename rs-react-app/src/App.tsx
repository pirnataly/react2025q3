import React from 'react';
import './App.css';
import { MyState } from '../interfaces/types';
import SearchBlock from '../components/search-block/SearchBlock';

class App extends React.Component<unknown, MyState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      text: localStorage.getItem('text') ?? '',
      heading: localStorage.getItem('text') ?? '',
      config: null,
    };
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target) {
      const { value } = e.target;
      this.setState({
        text: String(value),
      });
    }
  };

  setLocalStorage(): void {
    if (this.state.text) {
      localStorage.setItem('text', this.state.text.trim());
    } else {
      localStorage.removeItem('text');
    }
  }

  render() {
    return (
      <div className="app">
        <SearchBlock
          text={this.state.text}
          setLocalStorage={this.setLocalStorage}
          handleChangeInput={this.handleChangeInput}
        />
      </div>
    );
  }
}

export default App;
