import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBlock from './SearchBlock';
import '@testing-library/jest-dom';
import '@testing-library/dom';

describe('SearchBlock', () => {
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
