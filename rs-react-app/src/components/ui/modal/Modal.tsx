import { ModalProps } from '../../../interfaces/types';
import classes from './Modal.module.css';
import ModalContent from './ModalContent';

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

  return (
    <div className={mainClasses.join(' ')} data-testid="modal">
      <button
        type="button"
        className={classes.closeButton}
        onClick={() => {
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
        }}
      >
        Close
      </button>
      <ModalContent id={id ?? null} />
    </div>
  );
}
