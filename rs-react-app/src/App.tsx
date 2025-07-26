import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import ResultBlock from './components/result-block/ResultBlock';
import { ConfigType } from './interfaces/types';
import fetchResults from './service/request';
import { SearchBlock } from './components/search-block/SearchBlock';
import { Link, useNavigate, useSearchParams } from 'react-router';

export function App() {
  const navigate = useNavigate();
  const [params, setSearchParams] = useSearchParams({});
  const [text, setText] = useState(localStorage.getItem('text') ?? '');
  const [heading, setHeading] = useState(localStorage.getItem('text') ?? '');
  const [config, setConfig] = useState<ConfigType>('null');
  const [crash, setCrash] = useState(false);
  const page = params.get('page') ? Number(params.get('page')) : 1;

  function handleCrash() {
    setCrash(true);
  }

  const handleChangePage = (p: number) => {
    setSearchParams({ page: String(p) });
  };

  function fetchData() {
    const fetchArg = localStorage.getItem('text') || 'photo';
    setConfig(null);
    fetchResults(fetchArg, page).then((data) => {
      setConfig(data ?? null);
    });
  }

  useEffect(fetchData, [heading, page]);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target) {
      const { value } = e.target;
      setText(String(value));
    }
  }

  const setLocalStorage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (text) {
        localStorage.setItem('text', text.trim());
      } else {
        localStorage.removeItem('text');
      }
      setHeading(localStorage.getItem('text') ?? '');
      navigate('/', { state: page });
      if (params.has('page')) {
        params.delete('page');
      }
    },
    [text, setHeading, navigate, page, params]
  );

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
        <ResultBlock
          page={page}
          changePage={handleChangePage}
          result={config}
        />
        <button type={'button'} className={'button'} onClick={handleCrash}>
          {'ErrorBoundary'}
        </button>
      </div>
    );
  }
}

export default App;
