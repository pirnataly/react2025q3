import * as React from 'react';

export type MyState = {
  text: string;
  heading: string;
  config: null;
};

export type MyProps = {
  text: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLocalStorage: () => void;
};
