// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import './App.css';
// import ResultBlock from './../components/result-block/ResultBlock';
// import { SearchBlock } from '../components/search-block/SearchBlock';
// import { Link, useNavigate, useSearchParams } from 'react-router';
// import Modal from './../components/ui/modal/Modal';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { Flyout } from '../features/Flyout';
// import { Button } from '../components/ui/button/Button';
// import { ThemeContext } from '../contexts/ThemeContext';
// import { getTheme } from '../utils/utils';
// import { flickrApi, useFetchResultsQuery } from '../service/flickrApi';
// import { useDispatch } from 'react-redux';

export function App() {
  // const { theme, setTheme } = useContext(ThemeContext);
  // const navigate = useNavigate();
  // const [params, setSearchParams] = useSearchParams({});
  // const [text, setText] = useLocalStorage('text');
  // const [heading, setHeading] = useLocalStorage('text');
  // const page = params.get('page') ? Number(params.get('page')) : 1;
  // const id: string | null = params.get('detail') ? params.get('detail') : null;
  // const [modal, setModal] = useState(!!id);
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   document.body.className = modal ? 'lock' : 'body';
  // }, [modal]);
  //
  // const fetchArg = localStorage.getItem('text') || 'photo';
  //
  // const {
  //   data: config,
  //   isFetching: isPhotosLoading,
  //   error,
  //   refetch,
  // } = useFetchResultsQuery({ inputText: fetchArg, page });
  //
  // useEffect(() => {
  //   const handleOnline = () => {
  //     refetch();
  //   };
  //
  //   window.addEventListener('online', handleOnline);
  //   return () => window.removeEventListener('online', handleOnline);
  // }, [refetch]);
  //
  // const handleRefresh = () => {
  //   dispatch(
  //     flickrApi.util.invalidateTags([{ type: 'Cards', id: `${text}_${page}` }])
  //   );
  //   refetch();
  // };
  //
  // const handleChangePage = (p: number) => {
  //   setSearchParams({ page: String(p) });
  // };
  //
  // function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
  //   if (e.target) {
  //     const { value } = e.target;
  //     setText(String(value));
  //   }
  // }
  //
  // const setLocalStorage = useCallback(
  //   (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (text) {
  //       localStorage.setItem('text', text.trim());
  //     } else {
  //       localStorage.removeItem('text');
  //     }
  //     setHeading(localStorage.getItem('text') ?? '');
  //     navigate('/', { state: page });
  //     if (params.has('page')) {
  //       params.delete('page');
  //     }
  //   },
  //   [text, navigate, page, params, setHeading]
  // );
  // {
  //   return (
  //     <div className="app">
  //       <div
  //         role="button"
  //         tabIndex={0}
  //         aria-label="overlay"
  //         className={modal ? 'overlay' : 'overlay overlay_hidden'}
  //         onClick={() => {
  //           setModal(false);
  //           if (params.has('detail')) {
  //             params.delete('detail');
  //           }
  //           setSearchParams(new URLSearchParams(params));
  //         }}
  //         onKeyDown={() => {
  //           setModal(false);
  //         }}
  //       ></div>
  //       <header className="header app__header">
  //         <Button
  //           classname="button refresh-button"
  //           text="Refresh this page"
  //           type="button"
  //           onclickFunction={handleRefresh}
  //         />
  //         <Link to={'about'} className={'link app__link'}>
  //           About
  //         </Link>
  //         <Button
  //           classname="button button-theme"
  //           text={getTheme(theme) + ' theme'}
  //           onclickFunction={() => {
  //             setTheme(getTheme(theme));
  //             localStorage.setItem('theme', getTheme(theme));
  //           }}
  //         />
  //       </header>
  //       <SearchBlock
  //         text={text}
  //         setLocalStorage={setLocalStorage}
  //         handleChangeInput={handleChangeInput}
  //       />
  //       <ResultBlock
  //         page={page}
  //         changePage={handleChangePage}
  //         result={config}
  //         isPhotoLoading={isPhotosLoading}
  //         showModal={setModal}
  //         setSearchParams={setSearchParams}
  //         params={params}
  //         errorMessage={error}
  //         headingText={heading}
  //       />
  //       <Modal
  //         visible={modal}
  //         setVisible={setModal}
  //         setSearchParams={setSearchParams}
  //         params={params}
  //         id={id}
  //       />
  //       <Flyout />
  //     </div>
  //   );
  //
  return <div style={{ color: 'red' }}>APP IS RENDERING</div>
}

export default App;
