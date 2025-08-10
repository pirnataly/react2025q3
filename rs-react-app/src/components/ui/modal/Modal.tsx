import { ModalProps } from '../../../interfaces/types';
import classes from './Modal.module.css';
import '../../../app/App.css';
import ModalContent from './ModalContent';
import { Button } from '../button/Button';

export default function Modal({
  visible,
  setVisible,
  setSearchParams,
  id,
  params,
}: Partial<ModalProps>) {
  const mainClasses = [classes.modal];

  if (visible) {
    mainClasses.push(classes.modal_active);
  }

  function onclickCloseButton(): void {
    {
      if (setVisible) {
        setVisible(false);
      }
      if (params) {
        if (params.get('detail')) {
          params.delete('detail');
        }
      }
      if (setSearchParams) {
        setSearchParams(new URLSearchParams(params));
      }
    }
  }

  return (
    <div className={mainClasses.join(' ')} data-testid="modal">
      <Button
        type="button"
        classname={`button ${classes.closeButton}`}
        onclickFunction={onclickCloseButton}
        text="Close"
      />
      <ModalContent id={id ?? null} />
    </div>
  );
}
