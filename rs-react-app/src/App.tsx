import React from 'react';
import './App.css';
import SearchBlock from '../components/search-block/SearchBlock';
import ResultBlock from '../components/result-block/ResultBlock';
import { AppState } from '../interfaces/types';
import fetchResults from '../service/request';

class App extends React.Component<unknown, AppState> {
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

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const fetchArg = localStorage.getItem('text')
      ? localStorage.getItem('text')
      : 'photo';
    this.setState({
      config: null,
    });

    fetchResults(fetchArg).then((data) => {
      setTimeout(() => {
        this.setState({
          config: data ?? null,
        });
      }, 1000);
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
    return (
      <div className="app">
        <SearchBlock
          text={this.state.text}
          setLocalStorage={this.setLocalStorage}
          handleChangeInput={this.handleChangeInput}
        />
        <ResultBlock
          text={this.state.heading}
          config={this.state.config}
          heading={this.state.heading}
        />
      </div>
    );
  }
}

export default App;
