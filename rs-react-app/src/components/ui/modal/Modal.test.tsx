import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./ModalContent', () => ({
  default: ({ id }: { id: string | null }) => (
    <div data-testid="modal-content">ModalContent: {id}</div>
  ),
}));

describe('Modal component tests', () => {
  it('рендерится без ошибки, когда не visible', () => {
    render(<Modal visible={false} />);
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal.className.includes('modal_active')).toBe(false);
  });

  it('добавляет класс "modal_active" при visible = true', () => {
    render(<Modal visible={true} />);
    const modal = screen.getByTestId('modal');
    expect(modal.className.includes('modal_active')).toBe(true);
  });

  it('рендерит ModalContent с переданным id', () => {
    render(<Modal visible={true} id="test-id" />);
    expect(screen.getByTestId('modal-content')).toHaveTextContent(
      'ModalContent: test-id'
    );
  });

  it('обрабатывает нажатие на кнопку Close', () => {
    const setVisible = vi.fn();
    const setSearchParams = vi.fn();

    const params = new URLSearchParams();
    params.set('detail', '123');
    params.set('other', '456');

    render(
      <Modal
        visible={true}
        setVisible={setVisible}
        setSearchParams={setSearchParams}
        params={params}
      />
    );

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(setVisible).toHaveBeenCalledWith(false);
    const updatedParams = new URLSearchParams();
    updatedParams.set('other', '456');
    expect(setSearchParams).toHaveBeenCalledWith(updatedParams);
  });

  it('не вызывает setSearchParams, если он не передан', () => {
    const setVisible = vi.fn();
    const params = new URLSearchParams();
    params.set('detail', '789');
    render(<Modal visible={true} setVisible={setVisible} params={params} />);

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it('не вызывает setVisible, если он не передан', () => {
    const setSearchParams = vi.fn();
    const params = new URLSearchParams();
    render(
      <Modal visible={true} setSearchParams={setSearchParams} params={params} />
    );
    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(setSearchParams).toHaveBeenCalled();
  });
});
