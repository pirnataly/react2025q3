import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBlock from './SearchBlock';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import {
  mockHandleChangeInput,
  mockSetLocalStorage,
  windowClear,
} from '../../test-utils/mocks/localStorage';

describe('SearchBlock rendering tests ', () => {
  it('renders search input and button', () => {
    render(
      <SearchBlock
        text=""
        setLocalStorage={vi.fn()}
        handleChangeInput={() => {}}
      />
    );
    const input = screen.getByPlaceholderText('Введите текст');
    expect(input).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});

it('displays saved search term from localStorage on mount', () => {
  windowClear();
  const testSearchTerm = 'saved search';
  window.localStorage.setItem('searchText', testSearchTerm);
  render(
    <SearchBlock
      text={testSearchTerm}
      handleChangeInput={mockHandleChangeInput}
      setLocalStorage={mockSetLocalStorage}
    />
  );
  const input = screen.getByPlaceholderText('Введите текст');
  expect(input).toHaveValue(testSearchTerm);
});

it('Shows empty input when no saved term exists', () => {
  windowClear();
  render(
    <SearchBlock
      text=""
      handleChangeInput={mockHandleChangeInput}
      setLocalStorage={mockSetLocalStorage}
    />
  );
  const input = screen.getByPlaceholderText('Введите текст');
  expect(input).toBeInTheDocument();
});

describe('SearchBlock interaction tests', () => {
  it('should update input value when user types ', function () {
    render(
      <SearchBlock
        text=""
        handleChangeInput={mockHandleChangeInput}
        setLocalStorage={mockSetLocalStorage}
      />
    );
    const input = screen.getByPlaceholderText(
      'Введите текст'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(mockHandleChangeInput).toHaveBeenCalled();
  });

  it('should call setLocalStorage when search button is clicked', () => {
    render(
      <SearchBlock
        text="test"
        handleChangeInput={mockHandleChangeInput}
        setLocalStorage={mockSetLocalStorage}
      />
    );
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(mockSetLocalStorage).toHaveBeenCalledTimes(1);
  });
});
