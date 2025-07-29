import { render, screen, fireEvent } from '@testing-library/react';
import ResultBlock from './../../result-block/ResultBlock';
import { vi } from 'vitest';
import { mockSuccessConfig } from '../../../../test-utils/mocks/resultBlockMock';
import Pagination from './Pagination';
import * as utils from '../../../utils/utils';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';

vi.mock('../ui/loader/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('Pagination via ResultBlock', () => {
  const mockChangePage = vi.fn();
  const mockShowModal = vi.fn();
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    localStorage.setItem('text', 'cats');
    vi.clearAllMocks();
  });

  it('вызывает changePage при клике на номер страницы', () => {
    render(<Pagination page={1} pages={5} changePage={mockChangePage} />);
    const btn = screen.getByRole('button', { name: '3' });
    fireEvent.click(btn);
    expect(mockChangePage).toHaveBeenCalledWith(3);
  });
  it('клик по Next вызывает getNextPagesArray и меняет страницы', () => {
    const mockNext = vi
      .spyOn(utils, 'getNextPagesArray')
      .mockReturnValue([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    render(<Pagination page={5} pages={100} changePage={mockChangePage} />);
    const next = screen.getByRole('button', { name: /next/i });
    fireEvent.click(next);
    expect(mockNext).toHaveBeenCalled();
  });

  it('клик по Prev вызывает getPrevPagesArray и меняет страницы', () => {
    const mockPrev = vi
      .spyOn(utils, 'getPrevPagesArray')
      .mockReturnValue([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    render(<Pagination page={26} pages={100} changePage={mockChangePage} />);
    const prev = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prev);
    expect(mockPrev).toHaveBeenCalled();
  });

  it('рендерит Pagination, когда есть результат', () => {
    render(
      <Provider store={store}>
        <ResultBlock
          changePage={mockChangePage}
          result={mockSuccessConfig}
          page={1}
          showModal={mockShowModal}
          setSearchParams={mockSetSearchParams}
          isPhotoLoading={false}
          params={new URLSearchParams()}
          errorMessage={''}
        />
      </Provider>
    );

    expect(screen.getByText(/results were found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  });

  it('вызывает changePage при клике на номер страницы', () => {
    render(
      <Provider store={store}>
        <ResultBlock
          changePage={mockChangePage}
          result={mockSuccessConfig}
          page={1}
          showModal={mockShowModal}
          setSearchParams={mockSetSearchParams}
          isPhotoLoading={false}
          params={new URLSearchParams()}
          errorMessage={''}
        />
      </Provider>
    );

    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);
    expect(mockChangePage).toHaveBeenCalledWith(2);
  });

  it('показывает сообщение, если page > pages', () => {
    render(
      <ResultBlock
        changePage={mockChangePage}
        result={mockSuccessConfig}
        page={100}
        showModal={mockShowModal}
        setSearchParams={mockSetSearchParams}
        isPhotoLoading={false}
        params={new URLSearchParams()}
        errorMessage={''}
      />
    );

    expect(screen.getByText(/This page does not exist/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Choose another page or change text/i)
    ).toBeInTheDocument();
  });

  it('отображает Loader, если isPhotoLoading = true', () => {
    render(
      <ResultBlock
        changePage={mockChangePage}
        result={null}
        page={1}
        showModal={mockShowModal}
        setSearchParams={mockSetSearchParams}
        isPhotoLoading={true}
        params={new URLSearchParams()}
        errorMessage={''}
      />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('отображает сообщение об ошибке, если результат строка', () => {
    render(
      <ResultBlock
        changePage={mockChangePage}
        result={'something bad happened'}
        page={1}
        showModal={mockShowModal}
        setSearchParams={mockSetSearchParams}
        isPhotoLoading={false}
        params={new URLSearchParams()}
        errorMessage={''}
      />
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
