import React from 'react';
import './App.css';
import SearchBlock from './components/search-block/SearchBlock';
import ResultBlock from './components/result-block/ResultBlock';
import { AppState } from './interfaces/types';
import fetchResults from './service/request';

class App extends React.Component<unknown, AppState> {
  public constructor(props: unknown) {
    super(props);
    this.state = {
      text: localStorage.getItem('text') ?? '',
      heading: localStorage.getItem('text') ?? '',
      config: null,
      crash: false,
    };
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleCrash = this.handleCrash.bind(this);
  }

  handleCrash = () => {
    this.setState({ crash: true });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const fetchArg = localStorage.getItem('text') || 'photo';
    this.setState({
      config: null,
    });

    fetchResults(fetchArg).then((data) => {
      this.setState({
        config: data ?? null,
      });
    });
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
    this.fetchData();
  }

  render() {
    if (this.state.crash) {
      throw new Error('Ошибка при рендере компонента');
    }
    return (
      <div className="app">
        <SearchBlock
          text={this.state.text}
          setLocalStorage={this.setLocalStorage}
          handleChangeInput={this.handleChangeInput}
        />
        <ResultBlock {...this.state} />
        <button type={'button'} className={'button'} onClick={this.handleCrash}>
          {'ErrorBoundary'}
        </button>
      </div>
    );
  }
}

export default App;
