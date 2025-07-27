import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import ResultBlock from './components/result-block/ResultBlock';
import { ConfigType } from './interfaces/types';
import { SearchBlock } from './components/search-block/SearchBlock';
import { Link, useNavigate, useSearchParams } from 'react-router';
import useFetching from './hooks/useFetching';
import Modal from './components/ui/modal/Modal';
import fetchResults from './service/request';
import { useLocalStorage } from './hooks/useLocalStorage';

export function App() {
  const navigate = useNavigate();
  const [params, setSearchParams] = useSearchParams({});
  const [text, setText] = useLocalStorage('text');
  const [heading, setHeading] = useState(localStorage.getItem('text') ?? '');
  const [config, setConfig] = useState<ConfigType>('null');
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const id: string | null = params.get('detail') ? params.get('detail') : null;
  const [modal, setModal] = useState(!!id);

  useEffect(() => {
    document.body.className = modal ? 'lock' : 'body';
  }, [modal]);

  const [fetchData, isPhotosLoading, errorMessage] = useFetching(
    useCallback(async (pageNumber: number) => {
      const fetchArg = localStorage.getItem('text') || 'photo';
      setConfig(null);
      const data = await fetchResults(fetchArg, pageNumber);
      setConfig(data ?? null);
    }, [])
  );

  useEffect(() => {
    if (typeof fetchData === 'function') {
      fetchData(page);
    }
  }, [heading, page, fetchData]);

  const handleChangePage = (p: number) => {
    setSearchParams({ page: String(p) });
  };

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
    [text, navigate, page, params]
  );
  {
    return (
      <div className="app">
        <div
          role="button"
          tabIndex={0}
          aria-label="overlay"
          className={modal ? 'overlay' : 'overlay overlay_hidden'}
          onClick={() => {
            setModal(false);
            if (params.has('detail')) {
              params.delete('detail');
            }
            setSearchParams(new URLSearchParams(params));
          }}
          onKeyDown={() => {
            setModal(false);
          }}
        ></div>
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
          isPhotoLoading={isPhotosLoading}
          showModal={setModal}
          setSearchParams={setSearchParams}
          params={params}
          errorMessage={errorMessage}
        />
        <Modal
          visible={modal}
          setVisible={setModal}
          setSearchParams={setSearchParams}
          params={params}
          id={id}
        />
      </div>
    );
  }
}

export default App;
