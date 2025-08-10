import classes from './ModalContent.module.css';
import { ModalComponent } from '../../../interfaces/types';
import Loader from '../loader/Loader';
import { useFetchByIdQuery } from '../../../service/flickrApi';
import { getErrorMessage } from '../../../utils/utils';

export default function ModalContent({ id }: ModalComponent) {
  const {
    data: modalData,
    isFetching: isPhotoLoading,
    error,
  } = useFetchByIdQuery(id);

  function getUrl() {
    if (modalData) {
      return `https://live.staticflickr.com/${modalData.server}/${modalData.id}_${modalData.secret}_b.jpg`;
    }
  }

  if (isPhotoLoading) {
    return <Loader />;
  }
  return (
    <div data-test-id={'modal-content'} className={classes.modalContent}>
      {error ? (
        <h1
          className={classes.errorMessage}
        >{`Error: ${getErrorMessage(error)}`}</h1>
      ) : (
        <>
          <img
            src={
              getUrl() ??
              'https://live.staticflickr.com/65535/54650369805_293c7be4a1_b.jpg'
            }
            alt={`${id ?? 'This is no photo'}`}
            className={classes.modalImage}
          />

          <p
            className={`${classes.moduleDescription} ${classes.moduleHeading}`}
          >{`Title: ${modalData?.title._content ?? "Photo doesn't exist"}`}</p>
          <p className={classes.moduleDescription}>
            date: {modalData?.dates.taken}
          </p>
          <p className={classes.moduleDescription}>
            author: {modalData?.owner.realname}
          </p>
          <p className={classes.moduleDescription}>views: {modalData?.views}</p>
        </>
      )}
    </div>
  );
}
