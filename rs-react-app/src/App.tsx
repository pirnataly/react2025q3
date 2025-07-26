import React, { useEffect, useState } from 'react';
import './App.css';
import ResultBlock from './components/result-block/ResultBlock';
import { ConfigType } from './interfaces/types';
import fetchResults from './service/request';
import { SearchBlock } from './components/search-block/SearchBlock';
import { Link } from 'react-router';

export function App() {
  const [text, setText] = useState(localStorage.getItem('text') ?? '');
  const [config, setConfig] = useState<ConfigType>(null);
  const [crash, setCrash] = useState(false);

  function handleCrash() {
    setCrash(true);
  }

  function fetchData() {
    const fetchArg = localStorage.getItem('text') || 'photo';
    setConfig(null);
    fetchResults(fetchArg).then((data) => {
      setConfig(data ?? null);
    });
  }

  useEffect(fetchData, []);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target) {
      const { value } = e.target;
      setText(String(value));
    }
  }

  function setLocalStorage(): void {
    if (text) {
      localStorage.setItem('text', text.trim());
    } else {
      localStorage.removeItem('text');
    }
    fetchData();
  }

  {
    if (crash) {
      throw new Error('Ошибка при рендере компонента');
    }
    return (
      <div className="app">
        <Link to={'about'} className={'link app__link'}>
          About
        </Link>
        <SearchBlock
          text={text}
          setLocalStorage={setLocalStorage}
          handleChangeInput={handleChangeInput}
        />
        <ResultBlock config={config} />
        <button type={'button'} className={'button'} onClick={handleCrash}>
          {'ErrorBoundary'}
        </button>
      </div>
    );
  }
}

export default App;
